# Pakage Updater

## Getting Started

To start this project, follow these steps:

1. First, make sure you have Node.js and npm (Node Package Manager) installed on your system. If not, you can download and install them from [Node.js official website](https://nodejs.org/).

2. Open your terminal or command prompt and navigate to the project's root directory.

3. Run the following command to install the necessary dependencies:

```bash
    npm i
```
4. Once the dependencies are installed, you can start the project by running the following command:
```bash
    node ./index.js <package_name> <package_version> <workspace/reponame> <auth_token_path> <user_email> <base_branch>
```
Here's a breakdown of the command:
- <package_name> - Replace with the actual package name.
- <package_version> - Replace with the actual package version.
- <workspace/reponame> - Replace with the actual workspace and reponame, divided by a slash.
- <auth_token_path> - Replace with the actual path to the file where the bearer token is stored.
- <user_email> - Replace with the actual user email provided by Bitbucket for API requests.
- <base_branch> - Replace with the actual base branch.
Replace these placeholders with your specific project details.

## Linting Commands
```bash
  npm run lint
  # to fix
  npm run lint:fix
```

### **Warning:** Security Consideration
For security reasons, was made the decision to store the authentication token in a separate file. It's essential to prioritize the protection of sensitive information, such as API tokens and credentials. By keeping the token in a file, we aim to reduce the risk of accidental exposure and unauthorized access. Please ensure that the token file is appropriately secured and that only authorized individuals have access to it. Be cautious not to include the token directly in your code or expose it in any way that could lead to security vulnerabilities. Always follow best practices for securing sensitive data.

### Decision-Making:
  1. **JavaScript over TypeScript:** The choice of JavaScript over TypeScript was made due to the project's small and straightforward nature. TypeScript may be considered in the future, but initially, it seemed like an unnecessary overhead.

  2. **Bash Script Helper:** Instead of interprocess manipulation through JavaScript, a bash script was chosen as a helper for making changes. This decision was based on the simplicity of the current process, which doesn't require complex conditional execution or pattern changes. However, if a more granular approach becomes necessary, we can utilize JavaScript's `spawn` to control the process:
    ```javascript
      import { spawn } from 'node:child_process';
      const shellProcess = spawn('sh', []);
      shellProcess.stdin.write('echo "Hello, World!"\n');
      // Control the process as needed
    ```

  3. **NPM Support Only:** Currently, the project supports only NPM as a proof of concept. Expanding to support other package managers can be considered in the future.

  4. **Synchronous Execution:** Synchronous execution was chosen because the script needs to be executed line by line, and there are no user requests or a web server scenario where asynchronous operations would be more suitable.

  5. **Lack of Validation and Error Handling:** The project currently lacks input parameter validation, contains redundancy in parameters, and could benefit from specifying default values. Error handling is also an area for improvement, but due to time constraints, it may be addressed in future iterations. Additionally, consider implementing a mechanism for pruning the file system as needed for better resource management and maintenance.
