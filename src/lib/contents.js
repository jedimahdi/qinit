const getIndexHtmlContent = name => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${name}</title>
</head>
<body>
  
</body>
</html>
`

const getStyleContent = () => `* {
  margin: 0;
  padding: 0;
}`

const getValidFilesContent = () => `src/App.js`

const getTesterConfigContent = name => `{
  "version": 2,
  "tester_version": 2,
  "solution_signature": "src/App.js",
  "packages": [
    {
      "name": "test_${name}",
      "score": [0],
      "tests": [""],
      "aggregator": "sum"
    }
  ]
}
`

const getStatementContent = name => `{% extends "statement_base.md" %}

{% block name %}${name}{% endblock %}

{% block readme %}

**سطح:** اسان

**امتیاز:** ۳۰

**مهارتهای لازم:**

- آشنایی با 

{% endblock readme %}

{% block intro %} ظاهر کلی برنامه بدین صورت است:

![ظاهر برنامه](attachments/overview.png)

{% endblock intro %}

{% block run %}

**برای اجرای پروژه، باید \`NodeJS\` و \`npm\` را از قبل نصب کرده باشید.**

- ابتدا پروژهی اولیه را دانلود و از حالت فشرده خارج کنید.
- در پوشهی \`${name}\` ، دستور \`npm install\` را برای نصب نیازمندیها اجرا کنید.
- در همین پوشه، دستور \`npm start\` را برای راهاندازی پروژه اجرا کنید.
- پس از انجام موفق این مراحل، با مراجعه به آدرس \`http://localhost:3000/\`
  میتوانید نتیجه را ببینید.

{% endblock run %}

{% block details %}

{% endblock details %}

{% block notes %}

شما تنها مجاز به اعمال تغییرات در فایل \`App.js\` هستید.

{% endblock notes %}
`

const getQTestContent = () => `src/__tests__/
!src/__tests__/sample.test.js
`

const getQSampleTestContent = () => `src/__tests__/sample.test.js`

const getGitIgnoreContent = () => `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
**/node_modules/
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*`

const getReactIndexHtmlContent = name => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${name}</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
`

const getAppTestContent = () => `import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {render} from '@testing-library/react'

test('app', () => {
  expect(2).toBe(2)
})
`

const getIndexjsContent = () => `import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));`

const getAppjsContent = () => `import React from 'react';

function App() {
  return (
    <div className="app"></div>
  );
}

export default App;
`

const getRequirementsContent = () => `selenium
webcolors`

const getPythonTestContent = () => `import os
import pprint
import re
import subprocess
import sys
import unittest
from unittest.util import three_way_cmp

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

DEBUG = 'PRODUCTION' not in os.environ

SRC_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = '9988'

class SimpleTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        print('DEBUG = {}'.format(DEBUG), file=sys.stderr)
        cls.server = subprocess.Popen(['python3', '-m', 'http.server', PORT], cwd=SRC_PATH, stderr=subprocess.DEVNULL)

        desired_capabilities = dict({'loggingPrefs': {'browser': 'ALL'}}, **DesiredCapabilities.CHROME)

        if DEBUG:
            cls.driver = webdriver.Chrome(executable_path="/usr/lib/chromium/chromedriver", desired_capabilities=desired_capabilities)
        else:
            cls.driver = webdriver.Remote(
                command_executor='http://localhost:4444/wd/hub',
                desired_capabilities=desired_capabilities
            )

        cls.driver.implicitly_wait(1)
        cls.driver.get('http://127.0.0.1:'+ PORT + '/index.html')

    def test_center1(self):
        self.assertEqual(0, 0)


    @classmethod
    def tearDownClass(cls):
        console_logs = []
        for log_item in cls.driver.get_log('browser'):
            if log_item.get('source') == 'network' and 'favicon.ico - Failed to load' in log_item.get('message'):
                continue
            console_logs.append(log_item)
        if console_logs:
            print('\\n--------------------\\nBROWSER CONSOLE LOG:\\n-----', file=sys.stderr)
            for log_item in console_logs[:10]:
                log_item['message'] = log_item['message'][:200]
                print(pprint.pformat(log_item), '-----', sep='\\n', file=sys.stderr)
                cls.server.kill()
                cls.driver.close()


if __name__ == '__main__':
    unittest.main()
`

module.exports = {
  getIndexHtmlContent,
  getStyleContent,
  getValidFilesContent,
  getTesterConfigContent,
  getStatementContent,
  getQTestContent,
  getQSampleTestContent,
  getGitIgnoreContent,
  getReactIndexHtmlContent,
  getAppTestContent,
  getIndexjsContent,
  getAppjsContent,
  getRequirementsContent,
  getPythonTestContent,
}
