#!/bin/bash


if [ "$VITE" != "" ]; then
	pnpm concurrently \
		"npm:start:vite" "npm:start:compat-build" \
			--names "vite,compat-build"
	# pnpm concurrently \
	# 	"npm:start:vite" "npm:start:compat-build" \
	# 	"pnpm sync-dependencies-meta-injected --watch" \
	# 		--names "vite,compat-build,syncPnpm"
else
  pnpm start:ember
	# pnpm concurrently "npm:start:ember" "pnpm sync-dependencies-meta-injected --watch" \
		--names "ember,syncPnpm"
fi
