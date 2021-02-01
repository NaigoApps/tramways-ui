./node_modules/.bin/openapi-generator generate \
-i ../../resources/api/users-api.yaml \
-g typescript-axios \
-o src/api/generated/users \
--import-mappings=Property=MYProperty \
--type-mappings=Property=MYProperty
