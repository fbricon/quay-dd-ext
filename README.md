# Quay Extension for Docker Desktop [POC]

POC Docker Desktop extension to list images from https://quay.io

## Building locally

See API doc here: https://github.com/docker/extensions-sdk/tree/main/docs/dev/api

- Build with `make build-extension`
- Install the extension with `make install-extension`
- Run the extension in Dev mode with `make start-dev-extension`
    * changes to React code will be reflected in the UI on file save automatically.
- To stop Dev mode, run `make stop-dev-extension`
- When not in Dev mode, update the extension with `make update-extension`
- Uninstall extension with `make uninstall-extension`

## License

MIT License, see [LICENSE](LICENSE) for more information.