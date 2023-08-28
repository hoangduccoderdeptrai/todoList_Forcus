#include<iostream>
#include<map>
#include<vector>
#include<algorithm>
#include<queue>
using namespace std;
class Solution {
public:
    int minOperations(vector<int>& nums, int target) {
        priority_queue<int>que;
        long long sum =0;
        for(auto x:nums){
            que.push(x);
            sum+=x;
        }
        int ans=0;
        while(que.size()>0){
            int max =que.top();
            que.pop();
            sum-=max;
            if(target>=max){
                target-=max;
            }else if(target<max&&sum<target){
                sum+=max;
                que.push(max/2);
                que.push(max/2);
                ans++;
            }
        }
        if(target!=0)return -1;
        return ans;

    }
};
int main(){
   vector<int>nums{1,32,1,2};
   int target =12;
    Solution t;
    cout<<t.minOperations(nums,target);
}