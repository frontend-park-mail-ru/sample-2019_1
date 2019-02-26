const BLACKLIST_TAGS = [
	'iframe',
	'script',
];

const WHITELIST_ATTRS = [
	'src',
	'alt',
];

const R_TAG = /<(\w+)\s?(.*?)>.*?(<\/(.*?)>)?/;
const R_ATTRIBUTES = /(\w+\s*)=(\s*".*?")/g;

export function makeSafe(unsafeString = '') {
	return unsafeString
		.replace(R_TAG, (match, g1) => {
			return BLACKLIST_TAGS.includes(g1) ? '' : match;
		})
		.replace(R_ATTRIBUTES, (match, g1) => {
			return WHITELIST_ATTRS.includes(g1) ? match : '';
		})
	;
}
