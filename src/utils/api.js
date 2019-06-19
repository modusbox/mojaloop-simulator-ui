import { buildFetchActions } from 'modusbox-ui-components/dist/redux-fetch';

const handleError = (error, status, state) => {
  if (status === 401) {
    window.location.assign(state.app.config.loginUrl);
    // should exit the execution of the function
    // otherwise the non-authenticated response will be
    // treater as a regular response error, causing the UI
    // to display wrong error messages
    return;
  }
  return { error, status };
};

const services = {
  pki: {
    getApplicationUrl: state => state.app.config.apiUrl,
    getApplicationHeaders: () => {
      return undefined;
    },
    credentials: state => {
      if (state.auth.login.isDisabled) {
        return undefined;
      }
      return 'include';
    },
    sendAsJson: true,
    parseAsJson: true,
    handleError: handleError,
  },
};

const endpoints = {
  login: {
    service: services.pki,
    sendAsFormUrlEncoded: true,
    // the following key overrides the error handling for the login process.
    // The status code 401 unauthenticated needs to be handled differently on this endpoint 
    handleError: () => null,
    url: '/login',
  },
  logout: {
    service: services.pki,
    url: '/logout',
  },
  environments: {
    service: services.pki,
    url: '/environments',
  },
  dfsps: {
    service: services.pki,
    url: ({ environmentId }) => `/environments/${environmentId}/dfsps`,
  },
  egressIps: {
    service: services.pki,
    url: ({ environmentId, dfspId }) => `/environments/${environmentId}/dfsps/${dfspId}/endpoints/egress/ips`,
  },
  egressIp: {
    service: services.pki,
    url: ({ environmentId, dfspId, ipId }) =>
      `/environments/${environmentId}/dfsps/${dfspId}/endpoints/egress/ips/${ipId}`,
  },
  ingressIps: {
    service: services.pki,
    url: ({ environmentId, dfspId }) => `/environments/${environmentId}/dfsps/${dfspId}/endpoints/ingress/ips`,
  },
  ingressIp: {
    service: services.pki,
    url: ({ environmentId, dfspId, ipId }) =>
      `/environments/${environmentId}/dfsps/${dfspId}/endpoints/ingress/ips/${ipId}`,
  },
  ingressUrls: {
    service: services.pki,
    url: ({ environmentId, dfspId }) => `/environments/${environmentId}/dfsps/${dfspId}/endpoints/ingress/urls`,
  },
  ingressUrl: {
    service: services.pki,
    url: ({ environmentId, dfspId, urlId }) =>
      `/environments/${environmentId}/dfsps/${dfspId}/endpoints/ingress/urls/${urlId}`,
  },
  hubEgressIps: {
    service: services.pki,
    url: ({ environmentId }) => `/environments/${environmentId}/hub/endpoints/egress/ips`,
  },
  hubEgressIp: {
    service: services.pki,
    url: ({ environmentId, ipId }) => `/environments/${environmentId}/hub/endpoints/egress/ips/${ipId}`,
  },
  hubIngressIps: {
    service: services.pki,
    url: ({ environmentId }) => `/environments/${environmentId}/hub/endpoints/ingress/ips`,
  },
  hubIngressIp: {
    service: services.pki,
    url: ({ environmentId, ipId }) => `/environments/${environmentId}/hub/endpoints/ingress/ips/${ipId}`,
  },
  hubIngressUrls: {
    service: services.pki,
    url: ({ environmentId }) => `/environments/${environmentId}/hub/endpoints/ingress/urls`,
  },
  hubIngressUrl: {
    service: services.pki,
    url: ({ environmentId, urlId }) => `/environments/${environmentId}/hub/endpoints/ingress/urls/${urlId}`,
  },
  unprocessedEndpoints: {
    service: services.pki,
    url: ({ environmentId }) => `/environments/${environmentId}/dfsps/endpoints/unprocessed`,
  },
  confirmEndpoint: {
    service: services.pki,
    url: ({ environmentId, dfspId, endpointId }) =>
      `/environments/${environmentId}/dfsps/${dfspId}/endpoints/${endpointId}/confirmation`,
  },
  hubEndpoints: {
    service: services.pki,
    url: ({ environmentId }) => `/environments/${environmentId}/hub/endpoints`,
  },
  dfspCa: {
    service: services.pki,
    url: ({ environmentId, dfspId }) => `/environments/${environmentId}/dfsps/${dfspId}/ca`,
  },
  hubCas: {
    service: services.pki,
    url: ({ environmentId }) => `/environments/${environmentId}/cas`,
  },
  hubCa: {
    service: services.pki,
    url: ({ environmentId }) => `/environments/${environmentId}/ca/rootCert`,
  },
  inboundEnrollments: {
    service: services.pki,
    url: ({ environmentId, dfspId }) => `/environments/${environmentId}/dfsps/${dfspId}/enrollments/inbound`,
  },
  inboundEnrollmentSign: {
    service: services.pki,
    url: ({ environmentId, dfspId, enrollmentId }) =>
      `/environments/${environmentId}/dfsps/${dfspId}/enrollments/inbound/${enrollmentId}/sign`,
  },
  inboundEnrollmentCertificate: {
    service: services.pki,
    url: ({ environmentId, dfspId, enrollmentId }) =>
      `/environments/${environmentId}/dfsps/${dfspId}/enrollments/inbound/${enrollmentId}/certificate`,
  },
  outboundEnrollments: {
    service: services.pki,
    url: ({ environmentId, dfspId }) => `/environments/${environmentId}/dfsps/${dfspId}/enrollments/outbound`,
  },
  outboundEnrollmentCsr: {
    service: services.pki,
    url: ({ environmentId, dfspId }) => `/environments/${environmentId}/dfsps/${dfspId}/enrollments/outbound/csr`,
  },
  outboundEnrollmentCertificate: {
    service: services.pki,
    url: ({ environmentId, dfspId, enrollmentId }) =>
      `/environments/${environmentId}/dfsps/${dfspId}/enrollments/outbound/${enrollmentId}/certificate`,
  },
  outboundEnrollmentValidate: {
    service: services.pki,
    url: ({ environmentId, dfspId, enrollmentId }) =>
      `/environments/${environmentId}/dfsps/${dfspId}/enrollments/outbound/${enrollmentId}/validate`,
  },
  hubServerCerts: {
    service: services.pki,
    url: ({ environmentId }) => `/environments/${environmentId}/hub/servercerts`,
  },
  dfspsServerCerts: {
    service: services.pki,
    url: ({ environmentId, dfspId }) => `/environments/${environmentId}/dfsps/servercerts`,
  },
  dfspServerCerts: {
    service: services.pki,
    url: ({ environmentId, dfspId }) => `/environments/${environmentId}/dfsps/${dfspId}/servercerts`,
  },
  dfspsJWSCerts: {
    service: services.pki,
    url: ({ environmentId }) => `/environments/${environmentId}/dfsps/jwscerts`,
  },
  dfspJWSCerts: {
    service: services.pki,
    url: ({ environmentId, dfspId }) => `/environments/${environmentId}/dfsps/${dfspId}/jwscerts`,
  },
};

const apis = buildFetchActions(endpoints);
export default apis;
