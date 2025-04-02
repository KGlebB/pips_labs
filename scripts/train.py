import time
import pandas as pd
import numpy as np
from pymystem3 import Mystem
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import json
import argparse

def train(prefix=""):
  start_time = time.time()
  file_path = 'files/test_data.csv'
  df = pd.read_csv(file_path)

  mystem = Mystem()
  def preprocess_text(text: str) -> str:
    tokens = mystem.lemmatize(text.lower())
    tokens = [token for token in tokens if token.isalpha() and len(token) > 2]
    return ' '.join(tokens)

  X_train, X_test, y_train, y_test = train_test_split(
    df["title"].apply(preprocess_text), df["tonality"], test_size=0.3, random_state=42
  )

  vectorizer = TfidfVectorizer()
  vectorizer.fit(df['title'].apply(preprocess_text))

  X_train_vec = vectorizer.transform(X_train)
  X_test_vec = vectorizer.transform(X_test)
  
  param_grid = {
    "n_estimators": [100],
    "learning_rate": [0.01],
    "max_depth": [3],
    "min_samples_split": [2],
    "subsample": [0.8]
  }

  gb_model = GradientBoostingRegressor(random_state=42)

  grid_search = GridSearchCV(
    estimator=gb_model,
    param_grid=param_grid,
    scoring="neg_mean_squared_error",
    cv=2,
    verbose=1,
    n_jobs=-1
  )

  grid_search.fit(X_train_vec, y_train)

  end_time = time.time()
  elapsed_time = end_time - start_time
  best_gb_model = grid_search.best_estimator_

  y_pred = best_gb_model.predict(X_train_vec)

  mae = mean_absolute_error(y_train, y_pred)
  mse = mean_squared_error(y_train, y_pred)
  rmse = np.sqrt(mse)
  r2 = r2_score(y_train, y_pred)
  mad = np.median(np.abs(y_train - y_pred))
  mape = np.mean(np.abs((y_train - y_pred) / y_train)) * 100

  joblib.dump(best_gb_model, f'{prefix}best_gb_model.pkl')
  joblib.dump(vectorizer, f'{prefix}tfidf_vectorizer.pkl')

  metrics = {
    'MAE': mae,
    'MSE': mse,
    'RMSE': rmse,
    'R2': r2,
    'MAD': mad,
    'MAPE': mape,
    'Training Time (seconds)': elapsed_time
  }

  with open(f'{prefix}model_metrics.json', 'w') as f:
    json.dump(metrics, f, indent=4)

if __name__ == "__main__":
  parser = argparse.ArgumentParser(description="Train Gradient Boosting model with optional prefix for saved files.")
  parser.add_argument('--prefix', type=str, default="", help="Prefix for saved model and metrics files.")
  
  args = parser.parse_args()
  print(args)
  train(prefix=args.prefix)
