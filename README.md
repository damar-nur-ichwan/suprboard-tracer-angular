*Developed by Damar Nur Ichwan*
# SUPRBOARD-TRACER-ANGULAR
## Prerequisite
Make sure [JAEGER](https://www.jaegertracing.io/) or [ZIPKIN](https://zipkin.io/) was running.

## Installation
1. Install all the dependencies needed
```cmd
yarn add @jufab/opentelemetry-angular-interceptor 
yarn add @opentelemetry/api @opentelemetry/sdk-trace-web @opentelemetry/sdk-trace-base @opentelemetry/core @opentelemetry/semantic-conventions @opentelemetry/resources @opentelemetry/exporter-trace-otlp-http @opentelemetry/exporter-zipkin @opentelemetry/propagator-b3 @opentelemetry/propagator-jaeger @opentelemetry/context-zone-peer-dep @opentelemetry/instrumentation @opentelemetry/propagator-aws-xray --save-dev
```
2. Open the **src/app** folder
3. Make a file **suprboard-tracer-angular.ts**, then fill it with the source code of [suprboard-tracer-angular](./suprboard-tracer-angular.ts)
4. Adjust the *ZIPKIN_COLLECTOR_URL*, *SERVICE_GROUP*, and *SERVICE_NAME* variables to your needs
```ts
...
const ZIPKIN_COLLECTOR_URL = "http://localhost:9411/api/v2/spans"
const SERVICE_GROUP = "My Application"
const SERVICE_NAME = "My Application Frontend"
...
```
5. Open the **app.module.ts** file. Then add the following code:
```ts
...
import { OpenTelemetryInterceptor, CompositePropagator, ZipkinExporter, OtelCustomSpan } from './suprboard-tracer';
...
@NgModule({
    ...
    imports: [
        OpenTelemetryInterceptor,
        CompositePropagator,
        ZipkinExporter,
    ...
    ],
    ...
    providers: [
        ...
        OtelCustomSpan,
        ...
    ],
    ...
})
```
