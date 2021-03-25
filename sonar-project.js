const sonarqubeScanner =  require('sonarqube-scanner');
const { EnvironmentPlugin } = require('webpack');
sonarqubeScanner(
    {
        serverUrl:  process.env.SONAR_SERVER_URL,
        //serverUrl:  'http://sonarqube.dev-tools:9000',
        //serverUrl:  'http://localhost:9000',
        options : {
            'sonar.sources':  'src',
            'sonar.tests':  'src',
            'sonar.inclusions'  :  '**', // Entry point of your code
            'sonar.test.inclusions':  'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
            'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info',
            'sonar.dependencyCheck.jsonReportPath': 'reports/dependency-check/dependency-check-report.json',
            'sonar.dependencyCheck.htmlReportPath': 'reports/dependency-check/dependency-check-report.html'
//            'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml'
        }
    }, () => {});
