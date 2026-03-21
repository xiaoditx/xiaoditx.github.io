// g++ code.cpp -o code.cpp -std=c++17
#include <iostream>

class __range_array
{
private:
    int *arr_;
    size_t size_;

public:
    int *begin() const { return arr_; }
    int *end() const { return arr_ + size_; }
    __range_array(int x, int y) : size_(y - x)
    {
        arr_ = new int[size_];
        for (size_t i = 0; i < size_; i++)
        {
            arr_[i] = x + i;
        }
    }
    ~__range_array()
    {
        delete[] arr_;
    }
};

#define in :
#define range(x, y) (__range_array(x, y))

int main()
{
    for (int i in range(0, 10))
    {
        std::cout << i << " ";
    }
    std::cout << std::endl;
}