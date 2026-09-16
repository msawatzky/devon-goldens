import cognito from '../content/singletons/cognito.json';

export type CognitoEmbedMode = 'seamless' | 'iframe';

function trimSrc(value: unknown): string | undefined {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
}

/** Env overrides `src/content/singletons/cognito.json` when set. */
export function getCognitoDepositFormSrc(): string | undefined {
	return (
		trimSrc(import.meta.env.PUBLIC_COGNITO_DEPOSIT_FORM_SRC) ??
		trimSrc(cognito.depositFormSrc)
	);
}

export function parseCognitoFormSrc(src: string): { formKey: string; formId: string } | undefined {
	const match = src.match(/cognitoforms\.com\/f\/([^/]+)\/(\d+)/i);
	if (!match) return undefined;
	return { formKey: match[1], formId: match[2] };
}

export function getCognitoDepositFormHeight(): number {
	const fromJson = cognito.depositFormHeight;
	if (typeof fromJson === 'number' && fromJson > 0) return fromJson;
	return 854;
}

export function getCognitoEmbedMode(): CognitoEmbedMode {
	return cognito.embedMode === 'iframe' ? 'iframe' : 'seamless';
}

export function isCognitoDepositFormConfigured(): boolean {
	return getCognitoDepositFormSrc() !== undefined;
}
