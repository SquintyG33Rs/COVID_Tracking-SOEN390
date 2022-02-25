# COVID_Tracking-SOEN390
## programming project for SOEN 390 winter 2022

- project requires node.js and ionic to be installed on your machine to compile
  - https://nodejs.org/en/
  - `npm install`
in Bash or CMD
  - `npm install -g @ionic/cli`
in Bash or CMD


- To use with docker on windows & mac:
  - install: https://www.docker.com/products/docker-desktop

  - run
`docker-compose up`
in root directory.

- If your IDE uses PowerShell, to run commands directly into it (instead of having to open another terminal externally):
  - Open Windows PowerShell as an admin
  - `Get-ExecutionPolicy -list` 
  - `Set-ExecutionPolicy -scope LocalMachine RemoteSigned` to change the execution policy from Undefined -> RemoteSigned. It will remove the restrictions
  
  *see screenshot below for reference*
  
![image](https://user-images.githubusercontent.com/78240268/155800502-54ef1501-3548-4f22-9e74-efdf8d7e628f.png)
