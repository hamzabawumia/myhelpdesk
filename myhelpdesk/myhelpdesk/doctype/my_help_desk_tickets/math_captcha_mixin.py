# <yourdoctype>/<yourdoctype>/doctype/math_captcha_mixin.py

import frappe
import random
from frappe.model.document import Document
from frappe.utils.data import cint

class MathCaptchaMixin(Document):

    def validate(self):

        user_answer = cint(self.math_answer)
        question = self.math_question  # e.g., "What is 4 + 6?"

        try:
            parts = question.split()
            a = int(parts[2])
            b = int(parts[4].replace('?', ''))
            if (a + b) != user_answer:
                frappe.throw("Server Response: Incorrect math answer.")
        except Exception:
            frappe.throw("Server Response: You need to answer the math question to show that you are Human")



# Any doctype can inherit from this document, lik so:

#
# from math_captcha.math_captcha.doctype.math_captcha_mixin import MathCaptchaMixin
#
# class PrescriptionRequest(MathCaptchaMixin):
#     pass


# ensure that your doctype
# has the following fields
#
# Label	                 Fieldname	            Type	    Hidden?
# Math Question	        math_question	         Data	      No
# Math Answer	        math_answer	             Data	      No
# Math Captcha	        math_captcha	         Int	      Yes
#
#
