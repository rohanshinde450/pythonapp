pipeline {
    agent any

    environment {
        // Define any necessary environment variables here
        PYTHON = 'python3'  // You can adjust this if you're using a specific version
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                checkout scm
            }
        }

        stage('Set up Python') {
            steps {
                script {
                    // Set up Python environment (virtualenv or install dependencies)
                    sh '''
                    python -m venv venv  # Create virtual environment
                    source venv/bin/activate
                    pip install --upgrade pip  # Upgrade pip to the latest version
                    pip install -r requirements.txt  # Install dependencies
                    '''
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run the tests using pytest or unittest
                    sh '''
                    source venv/bin/activate  # Activate virtual environment
                    pytest --maxfail=1 --disable-warnings -q  # Run pytest (customize as needed)
                    '''
                }
            }
        }

        stage('Post-Test Actions') {
            steps {
                // You can add actions like archiving test results or creating reports
                junit '**/test-results.xml'  // Example for junit XML reports
            }
        }
    }

    post {
        always {
            // Clean up or perform any other necessary steps
            echo 'Cleaning up...'
            sh 'deactivate || true'
        }
        success {
            echo 'Tests passed!'
        }
        failure {
            echo 'Tests failed!'
        }
    }
}
