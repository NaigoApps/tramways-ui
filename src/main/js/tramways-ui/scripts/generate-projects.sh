../node_modules/.bin/openapi-generator generate \
-i ../../../resources/api/projects-api.yaml \
-g typescript-axios \
-o ../src/api/generated/projects \
--import-mappings=Property=pippo.MYProperty \
--type-mappings=Property=pippo.MYProperty
