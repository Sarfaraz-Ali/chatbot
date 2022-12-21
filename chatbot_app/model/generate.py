import tflearn
import random
import json
import os
import pickle
import nltk
import numpy as np
from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

class Generate():
    def __init__(self):
        #Need to provide path
        dir = os.path.dirname(os.path.abspath('__file__'))
        #Restoring all data structures
        data = pickle.load(open(dir + "\\chatbot_app\\model\\training_data","rb"))
        self.words = data['words']
        self.classes = data['classes']
        train_x = data['train_x']
        train_y = data['train_y']

        #Building our own Neural Network
        net = tflearn.input_data(shape=[None, len(train_x[0])])
        net = tflearn.fully_connected(net, 10)
        net = tflearn.fully_connected(net, 10)
        net = tflearn.fully_connected(net, len(train_y[0]), activation="softmax")
        net = tflearn.regression(net)

        #Defining Model and setting up tensorboard
        self.model = tflearn.DNN(net, tensorboard_dir="tflearn_logs") 

        self.model.load(dir + "\\chatbot_app\\model\\model.tflearn") #Loading the model

        # importing our intent file used for training the model.
        with open(dir+"\\chatbot_app\\model\\intents.json") as json_data: 
            self.intents = json.load(json_data)      # Loading data from intents.json file to var intents

    def clean_up_sentence(self, sentence):
        sentence_words = nltk.word_tokenize(sentence)
        sentence_words= [stemmer.stem(word.lower()) for word in sentence_words]

        return sentence_words

    def bow(self, sentence, words, show_details=False):
        
        sentence_words = self.clean_up_sentence(sentence)
        bag = [0]*len(words)
        for s in sentence_words:
            for i,w in enumerate(words):
                if w == s:
                    bag[i] = 1
                    if show_details:
                        print("Found in bag: %s"% w)
        return(np.array(bag))

    def classify(self, sentence):
        
        ERROR_THRESHOLD = 0.25
        #Generating probabilities from the model
        results = self.model.predict([self.bow(sentence, self.words)])[0]
        
        #Filter out predictions below a threshold
        results = [[i,r] for i,r in enumerate(results) if r>ERROR_THRESHOLD]
        
        #Sorting by strength of probability
        results.sort(key=lambda x: x[1], reverse=True)
        return_list = []
        for r in results:
            return_list.append((self.classes[r[0]], r[1]))
        
        # return tuple of intent and probability
        return return_list


    def response(self, sentence, userID='123', show_details=False):
        context = {} #Create a dictionary to hold user's context
        results = self.classify(sentence)
        
        #If we have a classification then find the matching intent tag
        if results:
            
            #Loop as long as there are matches to process
            while results:
                for i in self.intents['intents']:
                    
                    #Find a tag matching the first result
                    if i['tag'] == results[0][0]:
                        
                        #Set context for this intent if necessary
                        if 'context_set' in i:
                            if show_details: print ('context:', i['context_set'])
                            context[userID] = i['context_set']

                        # check if this intent is contextual and applies to this user's conversation
                        if not 'context_filter' in i or \
                            (userID in context and 'context_filter' in i and i['context_filter'] == context[userID]):
                            if show_details: print ('tag:', i['tag'])
                            
                            #A random response from the intent
                            return print(random.choice(i['responses']))

                results.pop(0)