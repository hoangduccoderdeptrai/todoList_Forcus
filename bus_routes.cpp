#include<iostream>
#include<vector>
#include<algorithm>
#include<sstream>
#include<string>
using namespace std;
class Solution {
public:
    string convert(string s, int numRows) {
        int row =numRows;
        int col =1001;
        string ans="";
        vector<vector<string>>grid(row,vector<string>(col,"0"));
       
        int k=0;
        for(int j=0;j<col&&k<s.length();j++){
          
            for(int i=0;i<row && k<s.length();i++){
                grid[i][j]=s[k];
                k++;
                
            }
            
            int x =row-2;
            j+=1;
            while(x>0 && k<s.length()){
                grid[x][j]=s[k];
                x--;
                j++;
                k++;
            }
            
            
        }
       
        for(int i=0;i<row;i++){
            
            for(int j=0;j<col;j++){
                
                if(grid[i][j]!="0")ans+=grid[i][j];
            }
           
        }
       
        return ans;
    }
   
};
int main(){
   
    string s ="PAYPALISHIRING";
   
    Solution t;
    string a =t.convert(s,4);
    cout<<a;
  
    
   
}