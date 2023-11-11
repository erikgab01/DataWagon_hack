import pandas as pd
import pickle

class Solution():
    def __init__(self):
        self.oot = pd.read_csv('./data/oot_march.csv')
        self.oot['repdate'] = self.oot['repdate'].astype(str)
        with open("./models/model_for_month.pkl", "rb") as f:
            self.model_m = pickle.load(f)

        with open("./models/model_for_day.pkl", "rb") as f:
            self.model_d = pickle.load(f)

    def predict(self, file_name):
        y_predict = pd.read_csv(file_name)
        y_predict['m'] = '2023-02-28'
        #y_predict['m'] = pd.to_datetime(y_predict['m'])
        temp = y_predict.merge(self.oot, left_on=['wagnum', 'm'], right_on=['wagnum', 'repdate'], how='left')
        temp = temp.drop(['m', 'repdate', 'month'], axis=1)
        temp = temp.fillna(0)


        m_preds = self.model_m.predict(temp)
        d_preds = self.model_d.predict(temp)

        y_predict = y_predict.drop('m', axis=1)

        y_predict['target_month'] = m_preds
        y_predict['target_day'] = d_preds

        return y_predict.to_dict('records')

