import { FullConfig } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

async function globalTeardown(config: FullConfig) {
  console.log('Global teardown executed');
  const now = new Date();
  const timestamp = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}_${now.getHours()}-${now.getMinutes()}`;
  const reportDir = path.resolve('web_execution_reports', `Report_${timestamp}`);
  const reportFile =
    process.env.BROWSERSTACK === 'true'
      ? `WebExecution_BS_Report_${timestamp}.html`
      : `WebExecution_Local_Report_${timestamp}.html`;

  return new Promise<void>((resolve, reject) => {
    const allureBinary = path.resolve('node_modules', '.bin', 'allure.cmd');

    const generation = spawn(
      allureBinary,
      ['generate', '--single-file', 'allure-results', '--output', reportDir],
      { shell: true }
    );

    const generationTimeout = setTimeout(() => {
      reject(new Error('Allure report generation timed out'));
    }, 150000);

    generation.on('exit', (exitCode) => {
      clearTimeout(generationTimeout);
      if (exitCode !== 0) {
        return reject(new Error(`Allure report generation failed with exit code ${exitCode}`));
      }

      const oldPath = path.join(reportDir, 'index.html');
      const newPath = path.join(reportDir, reportFile);

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          return reject(new Error(`Failed to rename report file: ${err.message}`));
        }
        console.log(`Allure report successfully generated at ${newPath}`);
        resolve();
      });
    });
  });
}

export default globalTeardown;
