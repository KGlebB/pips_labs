import argparse
import joblib
from pymystem3 import Mystem
import numpy as np

def preprocess_text(text: str) -> str:
  mystem = Mystem()
  tokens = mystem.lemmatize(text.lower())
  tokens = [token for token in tokens if token.isalpha() and len(token) > 2]
  return ' '.join(tokens)

def predict_tonality(text: str, model_path: str) -> float:
  try:
    model = joblib.load(f"{model_path}best_gb_model.pkl")
    vectorizer = joblib.load(f"{model_path}tfidf_vectorizer.pkl")
  except FileNotFoundError as e:
    raise RuntimeError(f"Model files not found: {e}")
  processed_text = preprocess_text(text)
  text_vector = vectorizer.transform([processed_text])
  prediction = model.predict(text_vector)
  return np.round(prediction[0], 4)

if __name__ == "__main__":
  parser = argparse.ArgumentParser(description="Predict tonality for text using trained model")
  parser.add_argument("--text", type=str, required=True, help="Input text to analyze")
  parser.add_argument("--model_path", type=str, default="v1_", help="Prefix path for model files (default: 'v1_')") 
  args = parser.parse_args()
  try:
    result = predict_tonality(args.text, args.model_path)
    print(f"Predicted tonality: {result}")
  except Exception as e:
    print(f"Error: {str(e)}")
