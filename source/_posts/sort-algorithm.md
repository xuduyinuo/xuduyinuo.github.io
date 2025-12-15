---
title: 十大经典排序算法
date: 2025-11-22 17:59:14
tags: 
	- algorithm
	- sort
categories: algorithm
---

# 十大经典排序算法

![sort_algorithm](sort-algorithm/sort.png)

## 冒泡排序

比较相邻元素，如果顺序不对就交换，每一轮都找到一个最大/最小的数移动到末尾或开头

重复完成剩余的待排序元素



代码详解：

```java
/**
 * 冒泡排序
 */
public class BubbleSort implements IArraySort{
    @Override
    public int[] sort(int[] sourceArray) {
        //拷贝原数组
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);

        for (int i = 0; i < arr.length - 1; i++) {

            // 提前结束标志位
            boolean flag = false;

            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                    flag = true;
                }
            }

            // 提前结束
            if (!flag) {
                break;
            }
        }

        return arr;
    }

    /**
     *交换数组中的两个元素
     */
    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

```

## 选择排序

遍历数组，从数组找到一个最小/最大的数，放在开头或末尾

对剩余待排序数组重复以上操作直至数组有序



代码详解：

```java
/**
 * 选择排序
 */
public class SelectionSort implements IArraySort{
    @Override
    public int[] sort(int[] sourceArray) {

        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);

        for (int i = 0; i < arr.length - 1; i++) {
            // 寻找当前索引之后的最小值
            int minIndex = i;

            for (int j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }

            // 如果最小值不是当前值，则交换
            if (minIndex != i) {
                swap(arr, i, minIndex);
            }
        }
        return arr;
    }


    /**
     *交换数组中的两个元素
     */
    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

```



## 插入排序

将待排序的元素逐个插入到已经排序的序列中的合适位置，直到整个序列都排好序为止。



代码详解：

```java
/**
 * 插入排序
 */
public class InsertSort implements IArraySort {
    @Override
    public int[] sort(int[] sourceArray) {

        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
        // 插入排序
        for (int i = 1; i < arr.length; i++) {
            int temp = arr[i];
            int j = i;
            while (j > 0 && arr[j - 1] > temp) {
                arr[j] = arr[j - 1];
                j--;
            }
            if (j != i){
                arr[j] = temp;
            }
        }

        return arr;
    }
}
```



## 希尔排序

将整个待排序的记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录"基本有序"时，再对全体记录进行依次直接插入排序。



代码详解：

```java
/**
 * 希尔排序
 */
public class ShellSort implements IArraySort{
    @Override
    public int[] sort(int[] sourceArray) {
        shellSort(sourceArray);
        return sourceArray;
    }

    private void shellSort(int[] sourceArray) {
        int n = sourceArray.length;
        int gap = n / 2;
        while (gap > 0) {
            for (int i = gap; i < n; i++) {
                int temp = sourceArray[i];
                int j = i - gap;
                while (j >= 0 && sourceArray[j] > temp) {
                    sourceArray[j + gap] = sourceArray[j];
                    j -= gap;
                }
                sourceArray[j + gap] = temp;
            }
            gap /= 2;
        }
    }
}

```

## 归并排序

将一个待排序的序列分成两个子序列，分别对两个子序列进行排序，然后将两个已排序的子序列合并成一个有序序列。

### 递归版本

```java
/**
 * 归并排序
 */
public class MergeSort implements IArraySort{

    public static int MAXN = 100001;

    // 辅助数组
    public static int[] help = new int[MAXN];

    @Override
    public int[] sort(int[] sourceArray) {
        int[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
        mergeSort(arr, 0, arr.length - 1);
        return arr;
    }

    /**
     * 递归归并排序
     */
    private void mergeSort(int[] sourceArray, int left, int right) {
        if (left >= right) {
            return;
        }
        int mid = left + (right - left) / 2;
        mergeSort(sourceArray, left, mid);
        mergeSort(sourceArray, mid + 1, right);
        merge(sourceArray, left, mid, right);
    }

    /**
     * 合并两个有序数组
     */
    private void merge(int[] sourceArray, int left, int mid, int right) {

        int i = left;
        int a = left;
        int b = mid + 1;
        while (a <= mid && b <= right) {
            help[i++] = sourceArray[a] <= sourceArray[b] ? sourceArray[a++] : sourceArray[b++];
        }
        // 左侧指针、右侧指针，必有一个越界、另一个不越界
        while (a <= mid) {
            help[i++] = sourceArray[a++];
        }
        while (b <= right) {
            help[i++] = sourceArray[b++];
        }
        for (i = left; i <= right; i++) {
            sourceArray[i] = help[i];
        }
    }
}

```

### 非递归版本

待续……



## 快速排序

选择一个基准元素，将数组分成两个子数组

使得左边元素都小于基准，右边元素都大于基准

对左右子数组递归地进行快速排序



代码详解：

```java
/**
 * 快速排序
 */
public class QuickSort implements IArraySort{
    @Override
    public int[] sort(int[] sourceArray) {
        quickSort(sourceArray, 0, sourceArray.length - 1);
        return sourceArray;
    }

    /**
     * 快速排序（递归）
     */
    private void quickSort(int[] sourceArray, int left, int right) {
        if (left < right){
            int pivot = partition(sourceArray, left, right);
            quickSort(sourceArray, left, pivot - 1);
            quickSort(sourceArray, pivot + 1, right);

        }
    }

    /**
     * 分区（排序）
     */
    private int partition(int[] sourceArray, int left, int right) {
        int pivot = sourceArray[left];
        int index = left + 1;
        for (int i = index; i <= right; i++) {
            if (sourceArray[i] < pivot) {
                swap(sourceArray, i, index);
                index++;
            }
        }
        swap(sourceArray, left, index - 1);
        return index - 1;
    }

    private void swap(int[] sourceArray, int a, int b) {
        int temp = sourceArray[a];
        sourceArray[a] = sourceArray[b];
        sourceArray[b] = temp;
    }
}

```

## 计数排序

建立一个计数器辅助数组，大小为待排序数组中的最大值+1，统计原数组中每个元素 i 出现的次数，存入计数器数组中的第 i 项。

将计数器数组中大于0的元素反向填充到原数组中。



代码详解：

```java
/**
 * 计数排序
 */
public class CountingSort implements IArraySort{
    @Override
    public int[] sort(int[] sourceArray) {
        countingSort(sourceArray);
        return sourceArray;
    }

    private void countingSort(int[] sourceArray) {
        int maxValue = getMaxValue(sourceArray);

        // 创建计数数组
        int[] countArray = new int[maxValue + 1];
        // 填充计数数组
        for (int value : sourceArray) {
            countArray[value]++;
        }
        // 填充原数组
        int index = 0;
        for (int i = 0; i < countArray.length; i++) {
            while (countArray[i] > 0) {
                sourceArray[index++] = i;
                countArray[i]--;
            }
        }
    }

    // 获取数组中的最大值
    private int getMaxValue(int[] sourceArray) {
        int maxValue = sourceArray[0];
        for (int value : sourceArray) {
            if (maxValue < value) {
                maxValue = value;
            }
        }
        return maxValue;
    }
}

```



## 堆排序

待续……



## 桶排序

待续……



## 基数排序

待续……

