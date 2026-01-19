// Copyright (c) 2026, Hamza Bawumia and contributors
// For license information, please see license.txt

// frappe.ui.form.on("My Help Desk Tickets", {
// 	refresh(frm) {
//
// 	},
// });

frappe.ui.form.on("My Help Desk Tickets", {
    refresh(frm) {
        // Generate CAPTCHA only for new documents or if the question is missing
        if (frm.is_new() && !frm.doc.math_question) {
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;

            frm.set_value("math_question", `What is ${a} + ${b}?`);
        }
    },

    validate(frm) {
        const q = frm.doc.math_question;
        const ans = parseInt(frm.doc.math_answer, 10);

        if (!q || isNaN(ans)) {
            frappe.msgprint(__("Please answer the math question."));
            frappe.validated = false; // Prevents saving
            return;
        }

        // Extract numbers safely using regex
        const match = q.match(/(\d+)\s*\+\s*(\d+)/);
        if (!match) {
            frappe.msgprint(__("Invalid math question format."));
            frappe.validated = false;
            return;
        }

        const a = parseInt(match[1], 10);
        const b = parseInt(match[2], 10);

        if (a + b !== ans) {
            frappe.throw(__("Incorrect math answer. Please try again.")); // Use frappe.throw to stop execution
        }
    }
});
