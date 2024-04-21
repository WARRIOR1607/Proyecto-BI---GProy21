import pandas as pd
import numpy as np
import sys
import joblib
import inflect

import re, string, unicodedata
import spacy
import es_core_news_lg
from sklearn.linear_model import LinearRegression
import nltk
nltk.download('stopwords')
nltk.download('punkt')
from nltk import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from sklearn.preprocessing import FunctionTransformer

from sklearn.model_selection import train_test_split,GridSearchCV
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer, HashingVectorizer
from sklearn.pipeline import Pipeline, FeatureUnion
from sklearn.svm import SVC
from sklearn.ensemble import BaggingClassifier, RandomForestClassifier, AdaBoostClassifier
from sklearn.naive_bayes import BernoulliNB
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.neighbors import KNeighborsClassifier

from sklearn.base import BaseEstimator, ClassifierMixin, TransformerMixin

class TextPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self, language='es'):
        self.language = language
        self.nlp = es_core_news_lg.load()
        self.stemmer = SnowballStemmer('spanish')

    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        X_processed = self._preprocess_text(X)
        return X_processed
    
    def _preprocess_text(self, text):
        # Aplicar pasos de preprocesamiento
        text = self._remove_non_ascii(text)
        text = self._to_lowercase(text)
        text = self._replace_numbers(text)
        text = self._remove_punctuation(text)
        if self.language == 'es':
            text = self._remove_stopwords(text)
        return text
    
    def _remove_non_ascii(self, text):
        return unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8', 'ignore')
    
    def _to_lowercase(self, text):
        return text.lower()
    
    def _replace_numbers(self, text):
        p = inflect.engine()
        words = text.split()
        new_words = []
        for word in words:
            if word.isdigit():
                new_word = p.number_to_words(word)
                new_words.append(new_word)
            else:
                new_words.append(word)
        return ' '.join(new_words)
    
    def _remove_punctuation(self, text):
        return re.sub(r'[^\w\s]', '', text)
    
    def _remove_stopwords(self, text):
        stop_words = set(stopwords.words('spanish'))
        words = text.split()
        filtered_words = [word for word in words if word.lower() not in stop_words]
        return ' '.join(filtered_words)

    
class TextProcessor(BaseEstimator, TransformerMixin):
    
    def __init__(self):
        self.stemmer = SnowballStemmer('spanish')
        self.nlp = es_core_news_lg.load()

    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        X_processed = self._preprocess_text(X)
        return X_processed
    
    def _preprocess_text(self, text):
        # Tokenizar el texto
        tokens = self._tokenize_words(text)
        # Aplicar lematización y derivación
        processed_text = self._stem_and_lemmatize(tokens)
        return processed_text
    
    def _tokenize_words(self, text):
        return word_tokenize(text)
    
    def _stem_words(self, words):
        """Stem words in list of tokenized words"""
        stems = []
        for word in words:
            stem = self.stemmer.stem(word)
            stems.append(stem)
        return stems
    
    def _lemmatize_words(self, words):
        """Lemmatize words using spaCy"""
        lemmas = []
        for word in words:
            doc = self.nlp(word)
            for token in doc:
                lemmas.append(token.lemma_)
        return lemmas

    def _stem_and_lemmatize(self, words):
        words = self._stem_words(words)
        words = self._lemmatize_words(words)
        return words