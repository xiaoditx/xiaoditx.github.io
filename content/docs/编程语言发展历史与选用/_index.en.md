---
title: "Comprehensive Research Study Report"
---

> [!note]
> This page uses AI technology for translation. The content is for reference only.

Written by: xiaoditx

Proofread by: Ma Heyang

### 0. Preface

Computer technology is inseparable from various programming languages. Therefore, **the development of programming languages can reflect the development of computer technology from a side perspective**. Each evolution of programming languages witnesses the demands of the era for computer technology. It can be said that the history of programming language development is the history of computer technology development.

This research study report will start with the history of "programming languages," analyze the characteristics of different languages in various eras, attempt to glimpse the development process of computer technology, and also aim to analyze **how to choose a programming language that suits oneself**.

The basic structure of this article is as follows:

1.  The Prehistoric Prototypes of Programming Languages
2.  Machine Language and Assembly Language
3.  The Evolution Path of High-Level Languages
4.  The Multi-Dimensional Development of Modern Programming Languages
5.  The Development Laws of Programming Languages and Selection Suggestions

### 1. The Birth of Programming Languages

Humans are lazy, and have been since ancient times. During the Eastern Han Dynasty, a device called the `Jacquard loom` was widely used. This device **can be traced back to the Shang Dynasty**. It was almost out of place in its time because of its function:

> The pattern-based Jacquard loom appeared in the Eastern Han Dynasty, also known as the Hua Lou (flower tower). It used a thread-based pattern chain to store the ***jacquard program***, and then used harness cords to lift the warp threads to open the shed. ***The pattern chain was a set of programs stored on the Jacquard loom for preserving pattern information***. It was woven from lingzi threads (representing warp threads) and erzi threads (representing weft threads) according to the pattern requirements.

Using an objective object to record a program to save effort—the Jacquard loom, during the Eastern Han Dynasty, quietly planted a seed ahead of its time. As the **Silk Road** opened up, the Jacquard loom flowed into Europe and, under the hands of generations of workers, physicists, and mathematicians, gradually took root and sprouted, growing into a towering tree named "**Computer Technology**".

### 2. First-Generation Programming Language — Machine Language

The first "**communication**" between humans and machines relied on **machine language**. This is a "language" composed purely of 0s and 1s, which is defined as the **first-generation computer language**.

The world of zeros and ones is the most fundamental "essence" of computers. Therefore, it is sufficiently basic, sufficiently complex, and has relatively low writing efficiency. Below is a small snippet of machine language code for you to experience:

```plaintext
Binary representation:
10001011 01000101 00000100
01011011
10001001 11000011

Hexadecimal representation:
8b 45 04
5b
89 c3
```

It's evident that the mix of zeros and ones makes the code content difficult to discern. Therefore, it's **very difficult for humans to quickly recognize it relying on so-called muscle memory or similar things**.

In fact, the long string above is **not even sufficient** to support a simple addition operation. If we accidentally write one character wrong now:

```plaintext
Incorrect:
10001011 01000101 00000100
01011011
10001101 11000011

Correct:
10001011 01000101 00000100
01011011
10001001 11000011
```

Can anyone tell at a glance which one is wrong? Probably not. Machine language requires at least three lines to implement addition. Within just three lines, the difficulty of error correction is so high; imagine the difficulties when actually used for software development.

This leads to the advantages and drawbacks of machine language:

Advantages are as follows:

-   Closest to the bottom layer, runs **fast enough**
-   Machines can **directly recognize** and run it without auxiliary programs
-   No redundant or useless content (program **size is small**)

Disadvantages are as follows:

-   **High memorization difficulty**
-   Faces the bottom layer directly, high learning difficulty
-   Strong dependence on the machine; one machine, one structure, **difficult to port**
-   **Only 0s and 1s**, easy to make mistakes and difficult to correct errors

This inevitably brings to mind Wang Shuang's description in "Assembly Language":

> Writing and reading machine code programs is not a simple task; one must remember all the abstract binary codes. The above is just a very simple small program, yet it exposes the obscurity and difficulty in error checking of machine code. If writing such a small program is already like this, what about a useful program that requires at least dozens of lines of machine code?

### 3. Assembly Language: Programmers' First Pursuit of Natural Language

Since machine language is so difficult to write, what should be done? Programmers came up with a solution: since direct "chatting" with the machine is somewhat difficult, why not **find a translator**? Thus, **Assembly Language** was born.

Baidu Baike defines assembly language as follows:

> Assembly Language is any kind of low-level language for electronic computers, microprocessors, microcontrollers, or other programmable devices, also known as a symbolic language.

Simply put, assembly language is like a universal translator. This "translator" established a language. When you need to "talk" to any machine, just find this "translator," speak the language it established, and it can interpret and convey the message to the machine using different expressions depending on the situation.

For example, Machine A stipulates that `0000` is an addition operation, while Machine B stipulates that `1010` is an addition operation. Now, assembly language stipulates that the addition operation is `+`. So when we write a program, we just need to write `+`. Assembly language will convey `0000` to Machine A and `1010` to Machine B.

Because of this varies from person to person translation of assembly language, it to some extent solves the problem of machine language's strong dependence on specific machines. Simultaneously, through operations like changing `0000` to `+`, writing programs becomes more intuitive and easier to remember (Which is easier to remember and write: `1 0000 2` or `1+2`? It's quite obvious).

Therefore, assembly language is sometimes called a mnemonic, meaning **text that aids memory**. Refer to the following [definition][4]:

> A mnemonic is a symbol that facilitates people's memory and can describe the instruction function and instruction operands. Mnemonics are English words or their abbreviations that indicate the instruction function.

The introduction of assembly made memorization no longer tedious and difficult to understand. For example, there are commands like `MOV`, `ADD`, `CALL`, etc. With a slight foundation in English, one can understand them well and remember them faster than binary codes.

Considering the non-negligible differences between machines of different designs, assembly has also derived different versions, such as IBM PC Assembly, ARM Assembly, GNU ASM, MASM, NASM, etc., which will not be expanded upon here.

Here is a quote from [an article][5] evaluating assembly language:

> The emergence of assembly language liberated programmers from tedious binary programming, allowing them to focus more on the logic and functional implementation of programs, laying an important foundation for the development of computer software.

In summary, assembly language allows people to achieve a state of knowing the how but not the why. For learning computer technology, this is actually a good state most of the time because it allows one to break free from tedious underlying principles. When wanting to use a computer to solve a problem, **one can directly think about what algorithm to use, rather than first looking at the underlying architecture of the machine**.

> tips: The author really likes assembly language. It is close to the bottom layer and is the key to unlocking the door to the fundamentals of computer science. It is an extremely challenging language and the language where one can learn the most about software operation principles.

### 4. The Dawn of High-Level Languages: The C/C++ Revolution

#### 1. The Birth of the C Language

In 1972, **Dennis MacAlistair Ritchie** of Bell Labs created the C language while developing the UNIX operating system. This is a language closer to natural language compared to assembly, with stronger readability.

Below is a classic code snippet to output `Hello World`, which is almost the common first lesson for everyone learning C language development.

```c
#include <stdio.h>
int main() {
    printf("Hello, World!\n");
    return 0;
}
```

These five lines accomplish one task: outputting a string of text to the console.

Some might think this is a simple matter, believing that C language is just this and has no great significance. That would be a big mistake. Let's take a look at the implementation of the same functionality in assembly language:

```asm
data segment ;data segment
    string db 'Hello,World!$'
data ends
code segment ;code segment
assume cs:code,ds:data
start:
    mov ax,data ;get segment base address
    mov ds,ax ;load segment base address into register
    mov dx,offset string
    mov ah,9
    int 21h
    mov ah,4ch
    int 21h
code ends
end start
```

To write such a piece of assembly code, one needs to know at least: the concept of registers, what a code segment is, what a data segment is, what a base address is, and the many syntaxes of assembly. Most assembly language textbooks take over fifty pages and still require external software assistance to see any effect at the software level. C language is clearly much better.

For those few lines of C language, most tutorials hardly exceed a thousand words: what is a header file, what is the main function—these concepts are very simple and can be understood with a little explanation.

Therefore, the advantages of the C language are the following:

-   Starts from the software level rather than the hardware level, reducing learning costs
-   Natively supports a large number of operations, simplifies writing, and facilitates reading

Of course, there are also disadvantages. When we use the `gcc -S -masm=intel m.c -o m.s` command to compile the program, we can see the compiler translates the C code into something like this:

![g++ compiled masm](/imgs/docs/research/cp-asm.png)

A total of thirty lines. Now, let's write the equivalent assembly code in the usual way (the output has an extra word but it doesn't affect the point):

![Pure assembly written version](/imgs/docs/research/masm.png)

The pure assembly version uses only fifteen lines. That is, the compiler wrote twice as much just to achieve the same effect. In fact, this difference becomes more pronounced in the later stages of compilation. Usually, GCC compiled programs need to link some library files during the linking stage, and the final product can sometimes be dozens of times larger than pure assembly.

This is the disadvantage of C language: it exchanges "less writing" in the process for "more writing" in the result. The reason ultimately lies in templating. Taking the output here as an example, the content we want to output is text, and we use the `printf` function. But this function can also output integers, floating-point numbers, etc. To ensure universality, the compiler has to include code adapted to other data types in the compiled file, even though some features may not be used.

> tips: The author actually doesn't have much fondness for C. Putting aside memory leak issues, procedural languages themselves aren't that convenient. Sometimes when writing software in C++, one has to use C syntax—frankly, it's quite troublesome (I heard the current GCC compiler is still written in C++, which is quite amusing).

#### 2. The New Birth of C++

The C language is indeed powerful, but this does not mean people were already satisfied with C's development efficiency. C language still had some unsatisfactory aspects: C is a **procedural language**, code reuse率 (rate) is insufficient. Due to its own design issues, dangerous type conversions and various errors are prone to occur, along with a high risk of memory leaks. During development, C's error reporting mechanism is not perfect and only guarantees stable operation within ten thousand lines of code.

Therefore, in 1983, C++ emerged. Danish professor **Bjarne Stroustrup** added concepts like classes to the C language, creating the so-called "**object-oriented programming supported**" C++. This language significantly reduced memory leak rates and provided support for large projects of million-line magnitude.

The emergence of C++ was undoubtedly a milestone. With its appearance, concepts like **polymorphism, encapsulation, objects, inheritance, namespaces, virtual functions, templates** quickly became popular, also influencing subsequent languages (like Java) to varying degrees, treating language abstraction capability as paramount.

Below are some feature demonstrations of C++:

```cpp
class Person {
public:
    virtual void SenRen_BanKa() = 0;
};
class DiYongJie : public Person {
public:
    std::string play = "YuZu soft!"
    void SenRen_BanKa() override {
        std::cout << "Ciallo!" << std::endl;
    }
};
```

Although many concepts were added, C++ and C are still strongly related. C++ is basically compatible with C language code (although old header files certainly need to be replaced). The two languages are actually very similar:

```cpp
#include<iostream>
using namespace std;
int main(){
    cout<<"Hello World";
    return 0;
}
```

This coexistence of **retention** and **evolution** led to the rapid success of C++, making large-scale software development possible. It is still widely used today in high-performance fields like game engines and operating systems.

#### 3. Feature Comparison

| Feature         | C           | C++             |
| --------------- | ----------- | --------------- |
| Programming Paradigm | Procedural    | Multi-paradigm       |
| Memory Management    | Manual       | Manual + Smart Pointers |
| Standard Library Size | Minimal      | Large            |
| Namespace Management  | Lacking      | Comprehensive      |
| Header Inclusion Mechanism | Primitive    | Improved          |
| Application Scenarios   | Embedded Systems | Large Commercial Software |

> tips: Because C++ retains a lot of C-style operations while adding an excellent and convenient standard library, C++ is sometimes jokingly called "C with STL" in the algorithm community.

### 5. Java: Realizing the Cross-Platform Dream

Some time after the birth of high-level languages, the internet boomed. But at that time, it relied solely on HTML, a markup language, to display **static pages**. So accessing the internet was essentially browsing online Word documents, which greatly limited the potential of the internet. People quickly noticed this and were searching for ways to make websites **dynamic**. However, early languages had very specific device requirements; computer software absolutely could not run on hardware like microcontrollers. So the direction of exploration became having a technology to develop software with cross-platform dissemination capabilities.

Against this background, Sun Microsystems introduced the Java language, accompanied by the revolutionary concept of "Write Once, Run Anywhere." It succeeded rapidly upon its release. In January 1996, Sun released the first Java Development Kit (JDK 1.0), marking Java as an independent development tool. Just eight months later, about 83,000 web pages had applied Java technology.

Below is Java code:

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

Actually, Java still retains many ideas from C/C++ because it itself evolved from the Oak language developed by Sun Microsystems. And the Oak language was a simplified C++ created by Sun for developing microcontroller programs.

Since Java was designed initially for developing **consumer electronic product software**, many optimizations were made for "**reliability**." Therefore, Java has the following advantages:

-   Evolved from C/C++, easy to learn, syntax more concise
-   Removed the concept of pointers; hardware is almost completely a black box for developers, ensuring software security while reducing learning costs
-   High portability

These advantages made Java dominate enterprise-level application development and become one of the foundational languages for Android development. However, the performance cost brought about for the sake of portability also makes it unsuitable for high-performance computing scenarios.

> tips: Java is notorious for being verbose, a point often teased by many programmers. Frankly, my early impression of Java was "pulling the classes out of C++ separately."

### 6. Python: The Victory of the Philosophy of Simplicity

#### 1. Concise Syntax

In 1989, **Guido van Rossum** designed Python, pushing code readability to the extreme. By using syntax extremely close to natural language, Python's learning difficulty greatly reduced, attracting a large number of programming beginners.

Below is a sample Python program to output `Hello World`:

```python
print("Hello World")
```

With just one line, Python can complete the output. This reflects one of its major characteristics: simplicity. Python simplified some verbose content in languages before it, allowing developers to focus on the real algorithm rather than function implementation.

#### 2. Powerful Standard Library

Comparing Python with C++, an indisputable fact is that C++'s `int` type variable can only store values between \-2,147,483,648 and 2,147,483,647. Even the longest `long long` type variable can only represent values between \-9,223,372,036,854,775,808 and 9,223,372,036,854,775,807. Python's `int` variable, however, has no such limitations and can store data of any size without overflow.

Bringing the aforementioned differences into actual development, we can understand by comparing C++ and Python's handling of high-precision calculations. There is a [problem][6] on the algorithm platform [Luogu](https://www.luogu.com.cn/): find the sum of factorials from 1 to n. Let's look at the Python solution:

```python
n=int(input())
ans=0 # Final answer storage
rec=1 # Factorial accumulation variable
for i in range(1,n+1):
    rec*=i
    ans+=rec
print(ans)
```

Done in just a few lines. It's a very simple problem, right?

But why does Luogu mark its difficulty as relatively high? The C++ code below will make it clear:

```cpp
#include<iostream>
#include<cstring>
using namespace std;

struct bigint {
    int len, nm[1000]; // Use struct to simulate big integer

    bigint() { // Parameterless initialization
        len = 0; // Initial length 0
        memset(nm, 0, sizeof(nm)); // Initialize to 0
    }

    bigint(int num) { // Initialize with int
        memset(nm, 0, sizeof(nm));
        len = 0;
        do {
            nm[len++] = num % 10;
            num /= 10;
        } while (num);
    }

    int operator[](int idx) const { // Return value of corresponding digit
        return nm[idx];
    }

    void process() { // Handle carry
        int carry = 0;
        for (int i = 0; i < 1000; ++i) {
            nm[i] += carry;
            carry = nm[i] / 10;
            nm[i] %= 10;
        }
        zero_processing();
    }

    void zero_processing() { // Reset length
        len = 0;
        for (int i = 999; i >= 0; --i) {
            if (nm[i] != 0) {
                len = i + 1;
                break;
            }
        }
        if (len == 0) len = 1; // Handle all-zero case
    }

    void print() { // Output
        for (int i = len - 1; i >= 0; --i)
            cout << nm[i];
    }
};

bigint operator+(const bigint& a, const bigint& b) {
    bigint c;
    for (int i = 0; i < max(a.len, b.len); ++i)
        c.nm[i] = a[i] + b[i];
    c.process();
    return c;
}

bigint operator*(const bigint& a, int b) {
    bigint c;
    for (int i = 0; i < a.len; ++i)
        c.nm[i] = a[i] * b;
    c.process();
    return c;
}

int main() {
    int n;
    cin >> n;
    bigint ans(0), tmp(1);
    for (int i = 1; i <= n; ++i) {
        tmp = tmp * i;
        ans = ans + tmp;
    }
    ans.print();
    return 0;
}
```

Writing this problem in C++ is exceptionally long. This is because the calculation result of this problem will be very long, and C++ requires simulation algorithms to prevent result overflow, whereas Python has a built-in simulation mechanism,no need for users to write it themselves.

#### Python's Advantages

By definition, Python is an interpreted language, possessing the same flexibility and high portability as Java. As a scripting language, Python is more adept at automated tasks like data calculations, hence it is widely used in large language models and web crawlers.

Python's advantages are as follows:

-   Powerful standard library, simple operations
-   Open-source community continuously maintained
-   Abundant third-party libraries
-   Interpreted language, saves debugging time

> tips: In recent years, some people have criticized Python as useless, claiming interpreted languages have extremely low runtime efficiency. I can only say each has its own advantages. For example, Python can teach the TK window library in the first compulsory IT course, while C++ requires groping around in MSDN for documentation (personal experience).

### 7. Exploration in the Chinese Internet

#### 1. Easy Language

Programming languages kept developing, extending into China. In 2000, a Chinese programming language emerged, using form programming, also interpreted, enabling software development with simple Chinese. This is Easy Language:

```easy
.如果（用户输入=="你好"）
    输出框.显示（"你好，世界！"）
.否则
    输出框.显示（"无法识别"）
```

Unlike other programming languages, Easy Language's first lesson is directly about window development. Short software development cycles and low difficulty of learning programming in Chinese instantly attracted many people.

Below is a screenshot of Easy Language's code writing interface:

![Easy Language](/imgs/docs/research/易语言.jpg)

Advantages of Easy Language:

-   Lowers the English barrier
-   Simplifies development, accelerates development efficiency
-   Powerful official components, covering various aspects

Disadvantages also exist:

-   Limited to the Windows platform
-   Lacks an open-source ecosystem
-   Only supports 32-bit compilation, insufficient runtime efficiency

#### 2. Wenyan-lang

After Easy Language, Chinese programming was popular for a while. In 2019, another language called Wenyan-lang emerged.

As the name suggests, Wenyan uses classical Chinese to write programs, making it almost an art form rather than a programming tool:

```wenyan
吾有一數。曰三。名之曰「甲」。
為是「甲」遍。
    吾有一言。曰「「問天地好在。」」。書之。
云云。
```

The Wenyan programming language is an experimental language used to spread classical Chinese culture and computer culture. Like the Chicken language, ///, Glass language, Piet language, etc., it is a kind of **semi-artwork**. This marks the high development of programming languages, leading people to begin exploring branches with certain creativity and artistry.

> tips: Easy Language was the first programming language the author encountered. It is definitely a "beginner-friendly language" because it is so convenient. Graphical interface allows window design, so all tutorials start with windows. Because of this, I later found GUI creation in other languages extremely troublesome.

### 8. Overall Summary: Development Laws

Based on the examples above, we can see the characteristics of language evolution:

1.  **Increase in Abstraction Level**
    Programming languages continuously develop towards "abstraction," gradually increasing code reuse rates, thereby improving development efficiency.
    *Evolution Path*: Machine Instructions → Symbolization → Structuring → Object-Oriented → Functional Programming

2.  **Balanced Evolution of Efficiency**
    Developers are more willing to discuss the trade-off between development and usage efficiency.
    *Evolution Path*: Execution Efficiency Priority → Development Efficiency Priority → Dynamic Balance Between the Two

3.  **Domain Specialization**
    Specialized languages emerged for various domains,typical examples include `.rc` files in Windows systems and the specialized language for writing installers in Inno Setup.
    *Evolution Path*: General-Purpose Languages → Domain-Specific Languages (DSL)

4.  **Syntax Simplification**
    *Evolution Path*: Redundant Syntax → Concise Expression → Approximation of Natural Language (Exploration direction for fifth-generation programming languages)

### 9. Selection Suggestions

Our research concludes that programming languages each have their own strengths. Language selection should be reasonably matched according to one's own needs, considering development efficiency and application scenarios. Below are some recommended pairing schemes.

1.  **Low-Level Development**
    -   Recommendation: C / Rust / A little Assembly
    -   Scenarios: Operating Systems, Embedded Systems
    -   Advantages: Close to the hardware, can be compiled into various forms

2.  **Rapid Development**
    -   Recommendation: Python / JavaScript / A little shell / Easy Language
    -   Scenarios: Web Applications, Data Analysis
    -   Advantages: Ready-made functions, efficient development

3.  **Cross-Platform Requirements**
    -   Recommendation: Java / Kotlin / QT framework
    -   Scenarios: Enterprise-Level Applications, Mobile Development
    -   Advantages: Cross-platform, easy to port

4.  **Academic Research**
    -   Recommendation: Python / Julia
    -   Scenarios: Scientific Computing, Machine Learning
    -   Advantages: Simplified code, prevents writing code from becoming a burden

5.  **Interest-Driven**
    -   Try: Wenyan-lang / Easy Language
    -   Value: Understand programming essence, cultivate computational thinking

When selecting a programming language, the following are key considerations:

-   Project Performance Requirements: Absolutely avoid high-level languages for high-performance needs;try to avoid low-level languages for specialized calculations.
-   Current Team Tech Stack: Decide based on team members' skills.
-   Community Ecosystem Maturity: The community is the pillar of development. The Rust community is a typical case; a good, mature community can always help every developer everywhere.
-   Personal Learning Curve: Choose based on personal learning plans.

### 10. Postscript

This topic is something I have wanted to research for a long time. Being able to realize it through this research study naturally makes me extremely excited, hence I busied myself back and forth doing many things, although I certainly added some chaos.

As the document's writer, I lack the team leader's profound professional accomplishments and the persistence focused on a single research direction. I could only rely on my not-so-deep knowledge and self-proclaimed passable literary skills to barely write down these finally presented words. I am ultimately somewhat apprehensive, worried that the written content has flaws. If readers can find errors in the article, big or small, I sincerely hope you can submit them via Issues on GitHub.

### 11. Reprint Afterthoughts

Language itself is full of controversy; there is no absolute right or wrong, good or bad. Just like **PHP** is sarcastically called "the best language in the world" by many programmers, it is still widely used after all. Whatever the language, as long as it suits you, it's a good language.

A while ago, I saw a joke, a dialogue between C++ and Python. It is roughly recorded below.

> C++ asks Python "What's your name?", Python doesn't answer. C++ thinks it wasn't polite enough, so it starts introducing itself. But it gets stuck when saying its own name because a stack error occurs. It can only leave while reporting errors. After C++ goes far away, Python finally shouts: "Python!"

This joke aims to say C++ is hard to write, prone to errors and crashes, while Python is very slow—maybe C++ has already run hundreds of lines of code while Python is still at the entry point. What this joke does well is that it simultaneously illustrates the disadvantages of both C++ and Python, conveying the concept that **there is no perfect language**.

### References

-  川合秀实 (Kawai Hidekazu) 《三十天自制操作系统》 (30-Day DIY Operating System) | People's Posts and Telecommunications Press
-  [A Brief History of Programming Language Development][1]
-  [The Chronicle of Programming Languages That Programmers Must Know][2]
-  王爽 (Wang Shuang) 《汇编语言》 (Assembly Language) | Tsinghua University Press
-  [Baidu Baike - Assembly Language][3]
-  [Baidu Baike - Mnemonic][4]
-  ***Deep Learning*** \- Ian Goodfellow, Yoshua Bengio, Aaron Courville
-  黑马程序员 (Heima Programmers) 《网页设计与制作项目教程》（第2版） (Web Design and Production Project Tutorial, 2nd Edition) | People's Posts and Telecommunications Press
-  [From Machine to Intelligence: The Past, Present, and Future of Assembly Language][5]
-  [Luogu - P1009 - Sum of Factorials][6]
-  [Java][7]
-  张毅刚 (Zhang Yigang)、赵光权 (Zhao Guangquan)、刘旺 (Liu Wang) 《单片机原理及应用》第三版 (Principles and Applications of Microcontrollers, 3rd Edition) | Higher Education Press
-  郭卫斌 (Guo Weibin)、罗勇军 (Luo Yongjun) 《算法竞赛入门到进阶》 (From Beginner to Advanced in Algorithm Competitions) | Tsinghua University Press
-  [MSDN - Microsoft Learn][8]
-  [C++, C and Assembler\\C++ Syntax Reference][9]
-  [C++ reference][10]
-  汪楚奇 (Wang Chuqi) 《深入浅出程序设计竞赛》 (Head First Programming Competitions) | Higher Education Press
-  郁红英 (Yu Hongying)、王磊 (Wang Lei)、武磊 (Wu Lei)、李春强 (Li Chunqiang) 《计算机操作系统》（第三版） (Computer Operating Systems, 3rd Edition) | Tsinghua University Press

### Declaration

In the "Machine Language" section, the machine language code was generated from assembly code via [Online x86 and x64 Intel Instruction Assembler](https://defuse.ca/online-x86-assembler.htm#disassembly). It is uncertain if there are conversion issues, so it holds no reference value and is only used to辅助理解 (aid understanding) the inconvenience of machine language.

[1]:https://blog.csdn.net/lywstuding/article/details/123216486
[2]:https://www.runoob.com/w3cnote/history-of-programming-languages-must-know.html
[3]:https://baike.baidu.com/item/%E6%B1%87%E7%BC%96%E8%AF%AD%E8%A8%80/61826
[4]:https://baike.baidu.com/item/%E5%8A%A9%E8%AE%B0%E7%AC%A6/489287
[5]:https://zhuanlan.zhihu.com/p/24327574773
[6]:https://www.luogu.com.cn/problem/P1009
[7]:https://www.java.com/zh-CN/
[8]:https://learn.microsoft.com/en-us/
[9]:https://learn.microsoft.com/zh-cn/cpp/cpp/cpp-language-reference?view=msvc-170
[10]:https://en.cppreference.com/w/cpp.html
