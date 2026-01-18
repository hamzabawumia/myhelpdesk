frappe.ready(function () {
	console.log("✅ Web Form JS loaded");

	const interval = setInterval(() => {
		if (!frappe.web_form || !frappe.web_form.doc) return;

		console.log("📌 Web Form fully loaded");
		clearInterval(interval);

		// 1️⃣ Math CAPTCHA
		if (!frappe.web_form.doc.math_question) {
			const a = Math.floor(Math.random() * 10) + 1;
			const b = Math.floor(Math.random() * 10) + 1;
			frappe.web_form.set_value(
				"math_question",
				`What is ${a} + ${b}?`
			);
		}

		// Validation
		frappe.web_form.validate = () => {
			const q = frappe.web_form.doc.math_question;
			const ans = parseInt(frappe.web_form.doc.math_answer, 10);

			if (!q || isNaN(ans)) {
				frappe.msgprint("Answer the math question.");
				return false;
			}

			// Extract numbers safely
			const match = q.match(/(\d+)\s*\+\s*(\d+)/);
			if (!match) {
				frappe.msgprint("Invalid math question.");
				return false;
			}

			const a = parseInt(match[1], 10);
			const b = parseInt(match[2], 10);

			if (a + b !== ans) {
				frappe.msgprint("Incorrect math answer.");
				return false;
			}

			return true;
		};

	}, 100);
});
