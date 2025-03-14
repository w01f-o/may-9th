const getToastifyConfig = (text, type) => {
	return {
		error: {
			text,
			style: {
				background: "var(--color-red)",
				borderRadius: "12px",
				cursor: "auto",
			},
			gravity: "top",
			position: "center",
		},
		info: {
			text,
			style: {
				background: "var(--color-gold)",
				borderRadius: "12px",
				cursor: "auto",
			},
			gravity: "top",
			position: "center",
		},
		success: {
			text,
			style: {
				background: "var(--color-green)",
				borderRadius: "12px",
				cursor: "auto",
			},
			gravity: "top",
			position: "center",
		},
	}[type];
};

export { getToastifyConfig };

