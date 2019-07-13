export interface AuditCompareRouteParams {
  fileType: string;
}

export const routes = {
  auth: {
    create: "/auth/create",
    signIn: "/auth/sign-in",
    validate: "/auth/validate",
  },
  audit: {
    compare: "/audit/compare",
  },
};
