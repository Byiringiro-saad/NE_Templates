#include <iostream>
#include <fstream>
#include <vector>

using namespace std;

//function declaration
void print(string filename);
void insert(string filename, string data);
void remove(string filename, string data);
void search(string filename, string data);
vector<string>splitText(string text, string delimiter);

//print data from a file
void print(string filename){
    ifstream file;
    file.open(filename);

    if(file.is_open()) {
        string line;
        
        while(getline(file, line)) {
            cout << line << endl;
        }
        
        file.close();
    } else {
        cout << "Unable to open file: " << filename << endl;
    }
}

//insert data into a file
void insert(string filename, string data){
    ofstream file;
    file.open(filename, ios::app);

    if(file.is_open()) {
        file << data << endl;
        file.close();
    } else {
        cout << "Unable to open file: " << filename << endl;
    }
}

//remove data from a file
void remove(string filename, string data){
    ifstream file;
    file.open(filename);

    if(file.is_open()) {
        string line;
        string temp;
        bool found = false;
        
        while(getline(file, line)) {
            if(line != data) {
                temp += line + "\n";
            } else {
                found = true;
            }
        }
        
        file.close();
        
        if(found) {
            ofstream file;
            file.open(filename);
            
            if(file.is_open()) {
                file << temp;
                file.close();
            } else {
                cout << "Unable to open file: " << filename << endl;
            }
        } else {
            cout << "Unable to find data: " << data << endl;
        }
    } else {
        cout << "Unable to open file: " << filename << endl;
    }
}

//search data from a file
void search(string filename, string data){
    ifstream file;
    file.open(filename);

    if(file.is_open()) {
        string line;
        bool found = false;
        
        while(getline(file, line)) {
            if(line == data) {
                found = true;
            }
        }
        
        file.close();
        
        if(found) {
            cout << "Found data: " << data << endl;
        } else {
            cout << "Unable to find data: " << data << endl;
        }
    } else {
        cout << "Unable to open file: " << filename << endl;
    }
}

//split text by delimiter
vector<string>splitText(string text, string delimiter){
    vector<string>result;
    int pos = 0;
    
    while((pos = text.find(delimiter)) != string::npos) {
        result.push_back(text.substr(0, pos));
        text.erase(0, pos + delimiter.length());
    }
    
    result.push_back(text);
    
    return result;
}

int main(){
    string filename = "data.txt";
    string data;
    string command;
    string delimiter = " ";
    vector<string>result;
    
    while(true) {
        cout << "Enter command: ";
        getline(cin, command);
        
        result = splitText(command, delimiter);
        
        if(result[0] == "print") {
            print(filename);
        } else if(result[0] == "insert") {
            insert(filename, result[1]);
        } else if(result[0] == "remove") {
            remove(filename, result[1]);
        } else if(result[0] == "search") {
            search(filename, result[1]);
        } else if(result[0] == "exit") {
            break;
        } else {
            cout << "Invalid command" << endl;
        }
    }
    
    return 0;
}