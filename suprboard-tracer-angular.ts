import { Span } from '@opentelemetry/api';
import {
    OpenTelemetryInterceptorModule,
    ZipkinExporterModule,
    CompositePropagatorModule,
    CustomSpan,
    OTEL_CUSTOM_SPAN
} from '@jufab/opentelemetry-angular-interceptor';

const ZIPKIN_COLLECTOR_URL = "http://localhost:9411/api/v2/spans" // PLEASE CHANGE HERE
const SERVICE_GROUP = "My Application" // PLEASE CHANGE HERE
const SERVICE_NAME = "My Application Frontend" // PLEASE CHANGE HERE

const config = {
    commonConfig: {
        production: true, //(boolean) Send trace with BatchSpanProcessor (true) or SimpleSpanProcessor (false)
        serviceName: SERVICE_NAME, //Service name send in trace
        probabilitySampler: '0.7', //Samples a configurable percentage of traces, string value between '0' to '1'
      },
      batchSpanProcessorConfig: { //Only if production = true in commonConfig
        maxQueueSize: '2048', // The maximum queue size. After the size is reached spans are dropped.
        maxExportBatchSize: '512', // The maximum batch size of every export. It must be smaller or equal to maxQueueSize.
        scheduledDelayMillis: '5000', // The interval between two consecutive exports
        exportTimeoutMillis: '30000', // How long the export can run before it is cancelled
      },
    zipkinConfig: {
        url: ZIPKIN_COLLECTOR_URL,
        headers: {
        'Content-Type': 'application/json'
        },
    }
}

class CustomSpanImpl implements CustomSpan {
    add(span: Span): Span {
      span.setAttribute("serviceGroup" , SERVICE_GROUP);
      return span;
    }
}

export const ZipkinExporter = ZipkinExporterModule
export const CompositePropagator = CompositePropagatorModule
export const OpenTelemetryInterceptor = OpenTelemetryInterceptorModule.forRoot(config)
export const OtelCustomSpan = { provide: OTEL_CUSTOM_SPAN, useClass: CustomSpanImpl}