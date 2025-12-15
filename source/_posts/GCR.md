---
title: Graph-constrained Reasoning:Faithful Reasoning on Knowledge Graphs with  Large Language Models
date: 2025-11-14 18:56:20
tags: 
	- LLM
	- Knowledge Graph
	- KG-Trie
categories: 论文笔记
description: Graph-constrained Reasoning
cover: GCR框架图.png
---

# Source

paper link: https://icml.cc/virtual/2025/poster/45868

Code and data are available at: https://github.com/RManLuo/graph-constrained-reasoning



# Motivation

1. LLM由于幻觉问题和缺乏特定领域的知识，推理的可靠性不足。
2. 现有的KG增强LLM的方法（基于检索和基于代理的方法），难以准确的从KG中检索知识。



# Contribution

1. 提出GCR框架
2. 结合微调的”小“模型的图推理能力和通用大模型的归纳推理能力增强框架的推理性能
3. 在RoG-webqsp和RoG-cwq等五个数据集上进行实验，证明了GCR实现了零幻觉且在当时达到了SOTA。（在无需训练的情况下，在零样本提示中具有广泛的通用性）



# Approach

## Graph-constrained Reasoning (GCR)

将KGs直接引入LLMs的解码过程，实现可靠推理。

由三个主要部分组成：1）知识图Trie构造 2）图约束解码 3）图归纳推理

GCR的总体框架如下图（c）所示：

![GCR框架图](GCR/GCR框架图.png)



## Knowledge Graph Trie Construction

因为知识图谱结构化的特性，LLM难以有效进行推理。

作者提出将KG的结构化知识转化为KG-Trie（知识图谱前缀树）索引，来应用于LLM的解码过程，促进LLM的推理能力。

方法：给定一个KG和问题及主题实体。

1. 从主题实体开始，使用图遍历算法在KG中遍历固定跳数的推理路径
2. 将搜索到的推理路径转化为自然语言句子
3. 使用LLM的分词器工具将自然语言句子转换为token并存储在KG-Trie中



形式化为如下公式：

![build_KG_trie](GCR/build_KG_trie.png)



## Graph-constrained Decoding

给定一个问题Q，通过提示一个经过微调之后的轻量化的小模型，在LLM解码时使用上一步骤中得到的KG-Trie作约束，保证LLM生成的推理路径都是KG中存在的有效的真实的路径。

LLM每次通过图约束解码得到有效的推理路径之后再切换回常规解码，生成以路径为条件的假设答案。



![](GCR/Graph-constrained-Decoding.png)



微调轻量化小模型方法：

训练数据中包含问题、问题实体、答案实体和问题相关知识图谱三元组

先将知识图谱三元组转化为图结构，再使用最短路径算法连接问题实体和答案实体，使其连接的路径作为该问题的推理路径。

作者实验标明，使用微调的轻量化小模型也能得到良好的推理性能。



>图约束解码方法不同于基于检索的解码方法，它将预先构造的KG-Trie集成到LLMs的解码过程中。这不仅减少了输入token，而且弥补了LLMs中的非结构化推理和KGs中的结构化知识之间的差距，允许在KGs上进行有效的推理，而不管其规模大小，这将导致可靠的推理，从而得到答案。



## Graph Inductive Reasoning

通过提示小模型得到该问题的多条推理路径和假设答案，再将这些推理路径和假设答案输入给一个强大的通用大模型，通过大模型及其内部知识进行归纳整理得到最终的答案。



![Graph-Inductive-Reasoning](GCR/Graph-Inductive-Reasoning.png)



# Experiment

## 思路学习

对实验步骤进行客观陈述，数据集、baseline、评估指标、实现过程等

说明你的实验具有什么效果，和基线相比有什么突出点

你的实验结果怎么和你的创新点相关联



基本：

可以在实验之前通过问题的方式告诉自己都需要做什么实验

通过实验告诉读者，你提出的框架或模型和基线相比有什么不同、提升……

通过实验告诉读者，你提出的框架或模型解决了什么问题

通过实验告诉读者，你提出的框架或模型可以怎么扩展，或应用在哪些下游任务……



## Implementations

我们使用KG-Trie索引从问题实体开始的2个跳内的所有推理路径。对于LLM，我们使用微调Llama3-8B 作为KG专用LLM。我们通过图约束解码生成前10条推理路径和假设答案。我们采用ChatGPT和GPT-4o-mini作为归纳推理的通用LLMs。



## Result

![result](GCR/result.png)



# Conclusion

提出了一种新的LLM推理范式，称为图约束推理（GCR），通过引入结构化KG来消除幻觉，保证推理的可靠性。

为了将LLMs中的非结构化推理与KGs中的结构化知识联系起来，我们提出了一种KG-Trie，利用基于Trie的索引对KGs中的路径进行编码。

使用大小模型协同作用，结合图推理和归纳推理生成最终答案。