SHELL:=/bin/bash

roll:
	npm run rollup

deploy:
	npm run deploy

push:
	npx auto-version --patch && git commit -am "auto-version" && git push origin dev && gh pr create --web