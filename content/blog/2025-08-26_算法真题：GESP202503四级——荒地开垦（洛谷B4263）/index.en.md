---
title: "Algorithm Problem: GESP202503 Level 4 — Wasteland Reclamation (Luogu B4263)"  # Article Title
draft: false  # Is it a draft? Set to false to publish.
date: 2025-8-26
description: "A classmate took the GESP exam and came back saying he got TLE on one problem. He wrote the problem down for me. Being a bit bored in class, I simply solved it. Tried it at home, made some changes, and AC'd smoothly."  # Article summary
tags: ["Algorithms", "C++", "GESP", "Simulation"]  # Article tags, for categorization and association
categories: ["Algorithm Learning Diary"]  # Article category
comments: true
date: 2025-08-26
authors:
  - name: xiaoditx
    link: https://github.com/xiaoditx
    image: https://github.com/xiaoditx.png
---

> [!note]
> This page uses AI technology for translation. The content is for reference only.

# Before We Start

A classmate took the GESP exam and came back saying he got TLE (Time Limit Exceeded) on one problem. He wrote the problem down for me. I had some ideas after reading it then and tried writing it in Easy Language, but it got messier and I gave up. This week, being a bit bored in class and having nothing better to do, I picked this problem up again. I tried it at home, made some changes, and AC'd (Accepted) smoothly.

The original problem goes like this:

```
Xiao Yang has a large piece of wasteland, which can be represented as an n by m grid.

Xiao Yang wants to reclaim this wasteland, but some positions in the wasteland contain debris. For a piece of wasteland without debris, it can be reclaimed if and only if all four adjacent cells (up, down, left, right) also contain no debris.

Xiao Yang can choose at most one position to clear its debris. After removal, that position becomes wasteland. Xiao Yang wants to know, under the condition of clearing at most one debris, the maximum number of wasteland pieces that can be reclaimed.
```
For input and output details, just check Luogu directly. I won't paste everything here: [Luogu B4263](https://www.luogu.com.cn/problem/B4263)
# The Code

Although I managed to write it, I'm not professionally trained in algorithms, so I don't really know about time complexity or space complexity, nor do I know what the algorithm I used is called. I only know I AC'd. Each test case大抵 (probably) passed in about 7-25ms (as shown below).

![Test point information](/imgs/blogs/算法真题荒地开垦/780cf181312b418da50cb8481a848b15.png)

Below is my code. This is the version with comments, but it might still confuse you with some of my inexplicable writing styles in certain places. If you can't understand it, you can just read the analysis, which has an almost line-by-line interpretation:

```cpp
#include<iostream>
#include<cstring>
int main(){
    int m,n,record_c=0;//Length, width, and debris count recording variable
    char tmp;//Actually wanted to use string ...
    int px[4]={0,0,1,-1},py[4]={1,-1,0,0};//Offset for non-reclaimable areas caused by debris
    std::cin>>n>>m;//Read length and width (Due to design reasons,I cna't but read them reversed)
    int imap[m][n];//Create map array (2D)
    int object[m*n][2];//Debris coordinate recording array
    memset(imap,0,sizeof(imap));//Initialize map to 0 (default no debris, reclaimable)
    for(int c=0;c<n;c++){//Loop to read content
        for(int vc=0;vc<m;vc++){
            std::cin>>tmp;//Temporarily read into tmp
            if(tmp=='#'){//Check if it's '#' (debris)
                imap[vc][c]=-1-imap[vc][c];//If debris, record with negative number and superimpose
                object[record_c][0]=vc;//Record debris position to reduce later workload, save time
                object[record_c][1]=c;
                record_c++;//Increment the recording variable by 1
                for(int dev_c=0;dev_c<4;dev_c++){//Calculate offset coordinates four times and check
                    int tx=px[dev_c]+vc,ty=py[dev_c]+c;//Offset X, Y
                    /* Boundary check to prevent out-of-bounds when operating array
                    Actually, if you think 'if' seriously affects efficiency, consider customized boundary checks, handle borders first then interior.
                    This would be more efficient but also means you need to write more code.
                    */
                    if((tx>=0)
                    && (tx<m) //These two lines check X
                    && (ty>=0) //Next two lines check Y
                    && (ty<n)){
                        if(imap[tx][ty]>-1){//Check "is it debris?"
                            imap[tx][ty]++;// >-1 means not debris, record impact by ++
                        }else{// <=-1 case
                            imap[tx][ty]--;
                        }
                    }
                }
            }
        }
    }

    // Reading finished. Feel the power of machine indentation!
    // (Actually, if it's uncomfortable, you could use goto to fix it, but not recommended)

    // Code used for debugging, kept in comments

    // for(int c=0;c<n;c++){
    //     for(int vc=0;vc<m;vc++){
    //         std::cout<<imap[vc][c]<<" ";
    //     }
    //     std::cout<<std::endl;
    // }

    int ans=0;//Initialize an ans variable to 0, used to store final output
    // The loop below reads the imap array, counting the number of "0"s
    for(int c=0;c<n;c++){
        for(int vc=0;vc<m;vc++){
            // Standard loop traversal
            if(imap[vc][c]==0){//Current cell is 0
                ans++;//ans records reclaimable cells, 0 means reclaimable, record +1
            }
        }
    }
    // The count of currently reclaimable cells is done.
    // Now start traversing each debris.
    int area,best=0;//Two variables to calculate reclaimable wasteland after debris removal
    // area is a temporary variable, storing the calculated reclaimable count each time
    // best is the optimal solution, the highest among all area values
    for(int c=0;c<record_c;c++){
        area=0;//area is just temporary, initialize to 0 each loop
        // Actually, writing 'int area;' here might be better
        for(int vc=0;vc<4;vc++){//Four offsets
            int tx=px[vc]+object[c][0],ty=py[vc]+object[c][1];//Calculate XY
            if((tx>=0) //Boundary check, same as before
            && (tx<m)
            && (ty>=0)
            && (ty<n)){
                if(imap[tx][ty]==1){//If it's 1, it means only affected by current debris, removal makes it reclaimable
                    area++;//Reclaimable wasteland count +1
                }
            }
        }
        if(imap[object[c][0]][object[c][1]]==-1){//Check if this debris is within the influence range of other debris
            area++;//If not, add one more
        }
        if(best<area)best=area;
        if(best==5)break;//Maximum value is five (itself + four offsets), break directly to save time
    }
    ans+=best;//ans plus the space freed up by removing debris
    std::cout<<ans;//Output answer
}
```

# Analysis

## 1. Problem Analysis

The problem states that wasteland can only be reclaimed if `all four adjacent cells (up, down, left, right) contain no debris`. Thinking this way seems difficult, but changing perspective might be easier. Let's assume the following $3×3$ wasteland:

```
...
.#.
...
```

Here, debris appears in the center. Since reclaimable wasteland must have no debris in adjacent cells, this one debris **affects** the wasteland above, below, left, and right. Let's use `!` to represent wasteland without debris but non-reclaimable:

```
.!.
!#!
.!.
```

That is, our way of determining if wasteland is non-reclaimable transforms into finding debris. What follows is the code content.

## 2. Data Reading and Preliminary Processing

### Preparing the "Map"

To solve the problem, we must first receive the data given by the problem. If we can't even receive the data well, how can we analyze it? So, we start by writing code to receive the first two data points and prepare for what's to come:
```cpp
#include<iostream>
#include<cstring>
int main(){
    int m,n,record_c=0;//Length, width, and debris count recording variable
    char tmp;//Actually wanted to use string
    int px[4]={0,0,1,-1},py[4]={1,-1,0,0};//Offset for non-reclaimable areas caused by debris
    std::cin>>n>>m;//Read length and width (read reversed due to design reasons)
    int imap[m][n];//Create map array (2D)
    int object[m*n][2];//Debris coordinate recording array
    memset(imap,0,sizeof(imap));//Initialize map to 0 (default no debris, reclaimable)
}
```
Two headers are used here, `iostream` and `cstring`, one is almost essential, the other is for initializing the array.

Some might say: Hey? Where did `using namespace std` go?

Actually, as long as you diligently add `std::`, you can omit this line. There are benefits to doing this, although it might not be easily apparent in algorithm competitions. But I'm more application-oriented (after all, I started with Easy Language), so I always pay attention to the habit of using `using` sparingly. You can search for "namespace pollution" to learn more.

Integer variables `m`, `n`, `record_c` are defined to: receive input n, receive input m, store debris count (due to a flaw, m and n were used reversed, found it hard to change, ended up having to use m for n); a char variable tmp, for receiving the `.` and `#` input later.

`px` and `py` in the code are actually "offset arrays". In practice, take a number n, for a point $A$, add its X coordinate + px[n], its Y coordinate + py[n], you can get an offset point. The offsets in this code correspond to right, left, down, up.

After defining these variables, we can start reading. Read m and n, these two numbers tell us the size of the entire land, helping us define a just right array as our "map" (I personally prefer things to be precisely sized, even with potential risks, but given my extensive experience with EPL, this approach seems quite reasonable).

`int imap[m][n]` creates a 2D array, imap means map (originally wrote `map`, but classmate said it seems to be a reserved word, changed to `imap`). This allows us to directly manipulate points using X and Y.

What is `object`? This is used to store the position information of debris. Considering there might be much debris, felt it better to define it as $m×n$. It's also a 2D array, but like a struct array (actually, each storage is `object[n][0]` for X, `object[n][1]` for Y. Could have written it as a struct, but I'm lazy, and I like arrays, hehe).

Last step, initialize the `imap` array to 0. Why 0? Please move to the next section.

### Quantifying Information for Each Position

For a cell, it can be wasteland, debris, wasteland affected by debris, or even debris within the influence range of other debris. Note: A wasteland cell can be affected by two or more debris pieces.

Note the following example:

```
.....
.#.#.
.....
```

In this example, the `.` between the two `#`s, even if debris on one side is removed, is still within the influence of the other debris, still cannot be reclaimed. So we consider this removal invalid for this single point.

How should we record how many debris pieces influence this point? We have a quantification strategy: use 0 for reclaimable, 1 for influence from one debris, 2 for two, up to 4.

Similarly, for the cell placing the debris, if removed, this cell might also become reclaimable or not, we also need to record it. Here we use -1 for debris, -2 for debris within the influence range of one other debris, and so on (this setting is for later recording convenience, we'll talk about it later).

### Writing the Map

```cpp
for(int c=0;c<n;c++){//Loop to read content
    for(int vc=0;vc<m;vc++){
        std::cin>>tmp;//Temporarily read into tmp
        if(tmp=='#'){//Check if it's '#' (debris)
            imap[vc][c]=-1-imap[vc][c];//If debris, record with negative number and superimpose
            object[record_c][0]=vc;//Record debris position to reduce later workload, save time
            object[record_c][1]=c;
            record_c++;//Increment the recording variable by 1
            for(int dev_c=0;dev_c<4;dev_c++){//Calculate offset coordinates four times and check
                int tx=px[dev_c]+vc,ty=py[dev_c]+c;//Offset X, Y
                /* Boundary check to prevent out-of-bounds when operating array
                Actually, if you think 'if' seriously affects efficiency, consider customized boundary checks, handle borders first then interior.
                This would be more efficient but also means you need to write more code.
                    */
                if((tx>=0)
                && (tx<m) //These two lines check X
                && (ty>=0) //Next two lines check Y
                && (ty<n)){
                    if(imap[tx][ty]>-1){//Check "is it debris?"
                        imap[tx][ty]++;// >-1 means not debris, record impact by ++
                    }else{// <=-1 case
                        imap[tx][ty]--;
                    }
                }
            }
        }
    }
}
```
(Please don't mind my strange variable names like `c`, `dev_c`, I just wanted to write statements like `c++`)

We use a simple loop to read character by character. Since we initialized the map to reclaimable, reading `.` can probably be directly discarded. Only `#` is important to us. We record it into `imap` and `object`.

The operation to record into `imap` is: -1 - current cell content. If it was originally 0, now it's -1; originally 1, now it's -2. You can look back at the [Quantifying Information for Each Position](#quantifying-information-for-each-position) section to see if it matches.

After writing, do four loops, corresponding to the four offsets of the `px` and `py` arrays, calculating the impact in turn : non-debris cells add one, debris cells subtract one.

When calculating offsets, note that the result might exceed the array range. At this time, we shouldn't operate on this non-existent coordinate, so add an `if` to check for out-of-bounds.
## 3. Statistics of Currently Reclaimable Number

Our idea here is: Since we can only remove one debris, let's first calculate how many can be reclaimed without removal, then find the debris whose removal can free up the most land. Thus, we need to first count the current reclaimable number:

```cpp
int ans=0;//Initialize an ans variable to 0, used to store final output
// The loop below reads the imap array, counting the number of "0"s
for(int c=0;c<n;c++){
    for(int vc=0;vc<m;vc++){
        // Standard loop traversal
        if(imap[vc][c]==0){//Current cell is 0
            ans++;//ans records reclaimable cells, 0 means reclaimable, record +1
        }
    }
}
```

Obviously, the current state is easy to judge. If it's 0, it means reclaimable. This is the value we quantified earlier. So whenever we find a 0, increment the `ans` variable. After one loop, the number of 0s in `imap` is stored in `ans`.

## 4. Finding the Optimal Solution

Now we only need to find the optimal removal solution. The simplest method here is to enumerate `object`. But my classmate seemingly turned the recorded positions into `.` one by one and analyzed the reclaimable count, which is somewhat inefficient (maybe I misunderstood him? Anyway, this method is slow). Actually, we can just read according to the offsets.

When a debris is removed, according to the definition, the values of the surrounding cells should decrease by 1, and its own position becomes positive and then decreases by 1. Thus, we know that only if its own cell is -1, removal makes it reclaimable; only if its surrounding cells are 1, removal makes them reclaimable. Thus, we get the following code:

```cpp
int area,best=0;//Two variables to calculate reclaimable wasteland after debris removal
for(int c=0;c<record_c;c++){
    area=0;//area is just temporary, initialize to 0 each loop
    // Actually, writing 'int area;' here might be better
    for(int vc=0;vc<4;vc++){//Four offsets
        int tx=px[vc]+object[c][0],ty=py[vc]+object[c][1];//Calculate XY
        if((tx>=0) //Boundary check, same as before
        && (tx<m)
        && (ty>=0)
        && (ty<n)){
            if(imap[tx][ty]==1){//If it's 1, it means only affected by current debris, removal makes it reclaimable
                area++;//Reclaimable wasteland count +1
            }
        }
    }
    if(imap[object[c][0]][object[c][1]]==-1){//Check if this debris is within the influence range of other debris
        area++;//If not, add one more
    }
    if(best<area)best=area;
    if(best==5)break;//Maximum value is five (itself + four offsets), break directly to save time
}
```

Using a "打擂台" (competition) method to select the optimal solution. Since itself plus offsets amount to at most five points, when `best` is 5, we can `break`, as no solution can be better. This saves time. In competitions, even if not done, it might AC, but a simple optimization of a few lines is still necessary. After all, C++'s concept is efficiency first.

## 5. Output

Since the optimal solution only considers -1 and 1, these reclaimable wasteland are additional compared to the state before removal. Simply adding `ans` and `best` gives the final result.

```cpp
ans+=best;//ans plus the space freed up by removing debris
std::cout<<ans;//Output answer
```

----
# Postscript

I can't help but share this original handwritten code draft. Although there are some minor flaws, it's overall complete.
![在这里插入图片描述](/imgs/blogs/算法真题荒地开垦/e1f8a85f1285426e8a46e216ae32bc2e.jpg)
Through solving this problem, I realized there is an excellent way to approach problems. When your code runs but doesn't work as desired, try thinking about how to describe your algorithm in natural language. This way, compared to staring at code and pulling hair, it's easier to find flaws in thinking. Those working on algorithms can try this.

I'm a bit sleepy, my brain isn't working well.可能 (Maybe) I wrote some inexplicable things迷迷糊糊 (drowsily). Going to sleep now, will modify after waking up.
