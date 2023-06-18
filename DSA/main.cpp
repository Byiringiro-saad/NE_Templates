#include <iostream>
#include <string>
#include <vector>
#include <cstdio>
#include <sstream>
#include <fstream>
#include <algorithm>

using namespace std;

//function declaration
void menu();
void help();
void addLocation(string location);
string stringToLower(string input);
void deleteLocation(string location);
vector<string> splitText(string sentence);
void addData(string filename, string data);

//split text
vector<string> splitText(string sentence) {
    stringstream ss(sentence);
    vector<string> words;
    string word;

    while(getline(ss, word, ' ')) {
        words.push_back(word);
    }

    return words;
}

//add data to file
void addData(string filename, string data){
    ofstream file;
    file.open(filename, ios::app);

    if(file.is_open()){
        file << data << endl;
    }else{
        cout << "Error writing to a file" << endl;
    }

    file.close();
}

void deleteData(string filename, string data){
    ifstream file;
    file.open(filename);

    string line;
    stringstream ss;

    if(file.is_open()){
        while(getline(file, line)){
            if(line.find(data) != string::npos){
                continue;
            }
            ss << line << endl;
        }
    }

    file.close();

    //open file for writing
    ofstream outfile;
    outfile.open(filename);

    if(outfile.is_open()){
        outfile << ss.str();
    }else{
        cout << "Error writing to a file" << endl;
    }

    outfile.close();

}

bool checkExists(string filename, string data){
    ifstream file;
    file.open(filename);

    string line;
    bool exists = false;
    while(getline(file, line)){
        if(line.find(data) != string::npos){
            exists = true;
        }
    }

    file.close();

    return exists;

}

int countRecords(string filename){
    ifstream file;
    file.open(filename);

    string line;
    int count = 0;
    while(getline(file, line)){
        count++;
    }

    file.close();

    return count;
}

//turn string to lowercase
string stringToLower(string input){
    string str = input;
   
    for_each(str.begin(), str.end(), [](char & c){
        c = tolower(c);
    });

	return str;
}

//add function
void addLocation(string location){

    //open file
    fstream locations;
    locations.open("locations.txt", ios::in);

    //check if file is open
    if(!locations.is_open()){
        cout << "Error opening file" << endl;
        exit(1);
    }

    //check if location exists
    string line;
    int lineCount = 0;
    bool exists = false;
    while(getline(locations, line)){
        lineCount++;
        if(line.compare(location) == 0){
            exists = true;
            break;
        }
    } 

    //if location exists
    if(exists){
        cout << "Location already exists" << endl;
        exit(1);
    }

    //add location to file
    int id = lineCount + 1;
    string data = to_string(id) + " " + location;
    addData("locations.txt", data);

    //close file
    locations.close();

    cout << "Location added" << endl;
    cout << "\n" << endl;

    menu();
}

//delete location
void deleteLocation(string location){
    //open file
    fstream locations;
    locations.open("locations.txt", ios::in);

    //check if file is open
    if(!locations.is_open()){
        cout << "Error opening file" << endl;
        exit(1);
    }

    //check if location exists
    string line;
    bool exists = false;
    while(getline(locations, line)){
        if(splitText(line).at(1).compare(location) == 0){
            exists = true;
            break;
        }
    } 

    vector<string> newLocations{};

    //delete location
    if(exists){

        //close file
        locations.close();

        deleteData("locations.txt", location);

        cout << "Location deleted" << endl;
        cout << "\n" << endl;

        menu();
    }else{
        cout << "Location does not exist" << endl;
        cout << "\n" << endl;

        menu();
    }
}

void record(string location, string disease, string caseNum){
    //open file
    ifstream cases;
    ifstream locations;
    cases.open("cases.txt");
    locations.open("locations.txt");

    //check if file is open
    if(!cases.is_open() || !locations.is_open()){
        cout << "Error opening file" << endl;
        exit(1);
    }

    //check if location exists
    bool locationExists = checkExists("locations.txt", location);

    if(!locationExists){
        cout << "Location does not exist" << endl;
        cout << "\n" << endl;

        menu();
    }else{

        //get number of records in cases
        int casesCount = countRecords("cases.txt");
        int id = casesCount + 1;

        string data = to_string(id) + " " + location + " " + disease + " " + caseNum;

        //create disease
        addData("cases.txt", data);

        //close file
        cases.close();
        locations.close();

        cout << "Record added" << endl;
        cout << "\n" << endl;

        menu();
    }

}

void list(string name){
    if(name == "locations"){
        ifstream locations;
        locations.open("locations.txt");

        //check if file is open
        if(!locations.is_open()){
            cout << "Error opening file" << endl;
            exit(1);
        }

        string line;
        while(getline(locations, line)){
            cout << line << endl;
        }

        locations.close();

        cout << "\n" << endl;

        menu();
    }else if(name == "diseases"){
        ifstream cases;
        cases.open("cases.txt");

        //check if file is open
        if(!cases.is_open()){
            cout << "Error opening file" << endl;
            exit(1);
        }

        string line;
        int id = 0;
        vector<string> diseases{};
        while(getline(cases, line)){
            vector<string> data = splitText(line);

            if(find(diseases.begin(), diseases.end(), data.at(2)) == diseases.end()){
                diseases.push_back(data.at(2));
                cout << id + 1 << " " << data.at(2) << endl;
                id++;
            }else{
                continue;
            }
        }

        cases.close();

        cout << "\n" << endl;

        menu();
    }else {
        cout << "Invalid command" << endl;
        cout << "\n" << endl;

        menu();
    }
}

void where(string disease){
    //open file
    ifstream cases;
    cases.open("cases.txt");

    //check if file is open
    if(!cases.is_open()){
        cout << "Error opening file" << endl;
        exit(1);
    }

    //check if disease exists
    bool diseaseExists = false;
    string line;
    while(getline(cases, line)){
        vector<string> data = splitText(line);
        if(data.at(2).compare(disease) == 0){
            diseaseExists = true;
            break;
        }
    }

    cases.seekg(0, std::ios::beg);

    if(!diseaseExists){
        cout << "Disease does not exist" << endl;
        cout << "\n" << endl;

        menu();
    }else{
        //get locations
        string eachLine;
        int id = 0;
        while(getline(cases, eachLine)){
            vector<string> data = splitText(eachLine);
            if(data.at(2).compare(disease) == 0){
                cout << id + 1 << " " << data.at(1) << endl;
                id++;
            }
        }

        //close file
        cases.close();

        cout << "\n" << endl;

        menu();
    }
}

void cases(string disease, string location){
    if(location == "any"){
        //open file
        ifstream cases;
        cases.open("cases.txt");

        //check if file is open
        if(!cases.is_open()){
            cout << "Error opening file" << endl;
            exit(1);
        }

        //check if disease exists
        bool diseaseExists = false;
        string line;
        while(getline(cases, line)){
            vector<string> data = splitText(line);
            if(data.at(2).compare(disease) == 0){
                diseaseExists = true;
                break;
            }
        }

        cases.seekg(0, std::ios::beg);

        if(!diseaseExists){
            cout << "Disease does not exist" << endl;
            cout << "\n" << endl;

            menu();
        }else{
            //count cases
            int count = 0;
            string eachLine;
            while(getline(cases, eachLine)){
                vector<string> data = splitText(eachLine);
                if(data.at(2).compare(disease) == 0){
                    count += stoi(data.at(3));
                }
            }

            //print cases
            cout << "Total cases of " << disease << " are " << count << endl;
            cout << "\n" << endl;

            menu();
        }
    }else{
        //open file
        ifstream cases;
        cases.open("cases.txt");

        //check if file is open
        if(!cases.is_open()){
            cout << "Error opening file" << endl;
            exit(1);
        }

        //check if disease exists
        bool diseaseExists = false;
        string line;
        while(getline(cases, line)){
            vector<string> data = splitText(line);
            if(data.at(2).compare(disease) == 0){
                diseaseExists = true;
                break;
            }
        }

        cases.seekg(0, std::ios::beg);

        if(!diseaseExists){
            cout << "Disease does not exist" << endl;
            cout << "\n" << endl;

            menu();
        }else{
            //count cases
            int count = 0;
            string eachLine;
            while(getline(cases, eachLine)){
                vector<string> data = splitText(eachLine);
                if(data.at(2).compare(disease) == 0 && data.at(1).compare(location) == 0){
                    count += stoi(data.at(3));
                }
            }

            //print cases
            cout << "Total cases of " << disease << " in " << location << " are " << count << endl;
            cout << "\n" << endl;

            menu();
        }
    }
}

void menu(){

    //listen to user input
    string command;
    cout << "Console > ";
    getline(cin, command);

    //turn into lower case
    command = stringToLower(command);

    vector<string> commands = splitText(command);


    if(commands.at(0).compare("add") == 0){
        addLocation(commands[1]);
    }else if(commands.at(0).compare("delete") == 0){
        deleteLocation(commands[1]);
    }else if(commands.at(0).compare("record") == 0){
        record(commands[1], commands[2], commands[3]);
    }else if(commands.at(0).compare("list") == 0){
        list(commands[1]);
    }else if(commands.at(0).compare("where") == 0){
        where(commands[1]);
    }else if(commands.at(0).compare("cases") == 0){
        if(commands.size() == 3){
            cases(commands[2], commands[1]);
        }

        if(commands.size() == 2){
            cases(commands[1], "any");
        }
    }else if(commands.at(0).compare("exit") == 0){
        cout << "exit" << endl;
    }else if(commands.at(0).compare("help") == 0){
        help();
    }else{
        cout << "Invalid command" << endl;
        cout << "\n" << endl;
        menu();
    }
}

//help function
void help(){
    cout << "\n" << endl;
    cout << "======================================================================================" << endl;
    cout << "*                                      HELP MENU                                     *" << endl;
    cout << "======================================================================================" << endl;
    cout << "\n" << endl;

    //help menu
    cout << "add <Location>                                 : Add a new location" << endl;
    cout << "delete <Location>                              : Delete an existing location" << endl;
    cout << "record <Location> <Disease> <Cases>            : Record a new disease and its cases" << endl;
    cout << "list locations                                 : List all locations" << endl;
    cout << "list diseases                                  : List all diseases" << endl;
    cout << "where <Disease>                                : Find where disease exists" << endl;
    cout << "cases <Location> <Disease>                     : Find cases of a disease in a location" << endl;
    cout << "cases <Disease>                                : Find total cases of a disease" << endl;
    cout << "\n" << endl;
    cout << "======================================================================================" << endl;
    cout << "help                                           : Prints user manual" << endl;
    cout << "exit                                           : Exit the program" << endl;
    cout << "======================================================================================" << endl;
    cout << "\n" << endl;
    cout << "======================================================================================" << endl;
    cout << "*                             END OF HELP MENU                                       *" << endl;
    cout << "======================================================================================" << endl;
    cout << "\n" << endl;

    menu();
}

//main function
int main()
{
    cout << "======================================================================================" << endl;
    cout << "                      WELCOME TO DISEASE CASES REPORTING SYSTEM                       " << endl;
    cout << "======================================================================================" << endl;
    cout << "                      Need Help? Type 'help' then press enter key                     " << endl;    
    cout << "======================================================================================" << endl;
    cout << "\n" << endl;

    //listen to user input
    string input;
    cout << "Console > ";
    getline(cin, input);

    //turn input into lowercase
    input = stringToLower(input);

    //check user input
    if(input == "help"){
        help();
    }else{
        menu();
    }

    return 0;
}