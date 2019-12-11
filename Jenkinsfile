pipeline {
    agent {
        label 'nodejs'
    }
    stages {

        stage('Build Client App') {
            steps {
                git branch: 'master', url: 'https://github.com/gnunn1/product-catalog-client'
                sh "npm install && npm run build"
            }
        }
        stage('Deploy Client App') {
            steps {
                sh "pwd & ls -l"
                script {
                    openshift.withCluster() {
                        openshift.withProject("product-catalog-dev") {
                        openshift.selector("bc", "client").startBuild("--from-dir=client/dist", "--wait=true")
                        }
                    }
                }
            }
        }
        stage('Deploy Client Image') {
            steps {
                sh "oc patch deployment client -n product-catalog-dev -p \"{\\\"spec\\\":{\\\"template\\\":{\\\"metadata\\\":{\\\"labels\\\":{\\\"date\\\":\\\"`date +'%s'`\\\"}}}}}\""
                sh "oc rollout status deployment client -n product-catalog-dev"
            }
        }

        stage('Approve') {
            steps {
            timeout(time:15, unit:'MINUTES') {
                input message: "Promote to Test?", ok: "Promote"
            }
            }
        }

        stage('Deploy Client in Test') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject('product-catalog-test') {
                        openshift.tag("product-catalog-dev/client:latest", "product-catalog-test/client:latest")
                        }
                    }
                }
                sh "oc patch deployment client -n product-catalog-test -p \"{\\\"spec\\\":{\\\"template\\\":{\\\"metadata\\\":{\\\"labels\\\":{\\\"date\\\":\\\"`date +'%s'`\\\"}}}}}\""
                sh "oc rollout status deployment client -n product-catalog-test"
            }
        }
    }
}