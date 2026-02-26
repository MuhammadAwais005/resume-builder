from rest_framework.decorators import api_view
from rest_framework.response import Response
from google import genai
import os

# --- PUT YOUR API KEY HERE ---
API_KEY = "AIzaSyBcSekaiHPc2WBXQ_-76Ss4flxqSs35IAQ"

client = genai.Client(api_key=API_KEY)

@api_view(['POST'])
def ai_enhance_text(request):
    try:
        print("--- AI Request Received ---")
        user_text = request.data.get('text', '')
        section_type = request.data.get('type', 'general')

        if not user_text:
            return Response({"error": "No text provided"}, status=400)

        # Prompt setup
        if section_type == 'experience':
            prompt = f"Rewrite this resume bullet point to be action-oriented and professional: '{user_text}'"
        else:
            prompt = f"Professional resume summary for: '{user_text}'"

        print(f"Sending prompt to Google AI: {prompt[:30]}...")

        # New API call format
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        print("AI Response Success!")

        return Response({"enhanced_text": response.text})

    except Exception as e:
        print("\n!!!!!!!!!!!!!! AI ERROR !!!!!!!!!!!!!!")
        print(f"ERROR DETAILS: {e}")
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n")

        return Response({"error": str(e)}, status=500)