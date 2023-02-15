# secrettool

## Non-operational/Work in Progress
This project is not yet operational, and not all features listed below have been implemented. The only backend currently supported is a mock "fakeSecretsManager".

## An open source, secret helper utility
secrettool is an open source secrets management helper CLI to help developers manage secrets. It provides a few mechanisms to help ease common pain points for secrets management such as creating secrets, setting/changing the value, and ensuring that the correct permissions are assigned. 

## Platform Independent
secrettool is not a replacement for secrets management tools/platforms - instead, it augments these platforms with a standard set of utilities for managing secrets. It supports custom, pluggable backends and can be tailored to fit any secrets management platform.

## Secrets Manifest
secrettool creates a new convention for secrets management in the form of a manifest file called `secrets.yaml` placed in the root of your repo:
```
project: noodles

secrets:
 - foo
 - bar
```

* project: the name of your project
* secrets: the list of all secrets that the project needs

## Secrets Linting
secrettool includes a secrets "linter" to ensure:
* All secrets in your secrets manifest have been correctly annotated in your application
* Secret names in your manifest are spelled correctly
* All secrets in your manifest exist and have been created in the secrets management platform
* Values have been set for each secret

## Interactive & Consistent
Why not use the native CLI to manage secrets? secrettool offers an interactive, simplified means to manage secrets with helpful interactive prompts. It also enforces consistency to ensure that all secrets created with the utility follow the same naming convention & access controls making for a clean, organized secrets management experience for everyone!

## Demo
![Screenshot](https://user-images.githubusercontent.com/18070948/218890548-050ea743-e080-454a-a646-337b27b10133.png)
