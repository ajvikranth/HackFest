import pandas
from data import data_processing
from predict import redistribute_classification

def main():
    df = data_processing()
    distribute = redistribute_classification(df)
    recycle = [not bool(x) for x in distribute]
    print(df[recycle])

if __name__=="__main__":
    main()