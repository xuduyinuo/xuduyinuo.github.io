---
layout: post
title: "Small Tools, Clear Thinking"
date: 2026-10-13 18:00:00 +0800
categories: [技术]
sample: true
---

一个小工具的价值，往往在于把反复出现的问题变成一个明确的动作。

<!-- more -->

*这是一篇用于预览排版的示例文章。*

## 从重复的动作开始

与其先规划一个完整的系统，不如先观察：哪件事需要每天重复三次？哪些步骤总是因为遗漏而重做？

把输入、输出和失败条件写清楚，小工具的轮廓也就出现了。

## 让结果可检查

下面这个例子统计一段文字中的非空行：

```python
def count_lines(text):
    return sum(bool(line.strip()) for line in text.splitlines())
```

它只有一个职责，也容易用几段短文本确认结果。工具可以很小，边界要足够清楚。

## 留下下一步

等这个动作稳定以后，再考虑批量处理、界面或更多配置。每次只增加一个真正需要的能力。
