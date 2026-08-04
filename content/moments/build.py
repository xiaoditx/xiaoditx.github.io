#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import re
import datetime
import subprocess
import tempfile
from pathlib import Path

# ---------- 配置 ----------
AUTHOR_NAME = "xiaoditx"
AUTHOR_LINK = "https://github.com/xiaoditx"
AUTHOR_IMAGE = "https://github.com/xiaoditx.png"
# -------------------------

def get_current_time():
    """返回当前时间的年、月、日、时、分"""
    now = datetime.datetime.now()
    return now.year, now.month, now.day, now.hour, now.minute

def get_editor():
    """获取编辑器，优先使用环境变量，否则默认 vim"""
    return os.environ.get('EDITOR', 'vim')

def get_user_input(prompt):
    """获取用户输入（保留空格）"""
    return input(prompt)

def edit_content_with_vim():
    """调用 Vim 编辑内容，返回用户输入的正文"""
    with tempfile.NamedTemporaryFile(mode='w+', suffix='.md', delete=False, encoding='utf-8') as tmp:
        tmp_path = tmp.name
    editor = get_editor()
    subprocess.call([editor, tmp_path])
    with open(tmp_path, 'r', encoding='utf-8') as f:
        content = f.read()
    os.unlink(tmp_path)
    return content

def find_max_weight_in_month(month_dir):
    """扫描月份目录下所有子文件夹的 index.md，返回最大 weight，若无则返回 0"""
    max_w = 0
    if not os.path.isdir(month_dir):
        return 0
    for item in os.listdir(month_dir):
        sub_path = os.path.join(month_dir, item)
        if os.path.isdir(sub_path):
            idx_path = os.path.join(sub_path, 'index.md')
            if os.path.isfile(idx_path):
                with open(idx_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                # 提取 weight
                m = re.search(r'^---\n.*?^weight:\s*(\d+)\s*$', content, re.MULTILINE | re.DOTALL)
                if m:
                    w = int(m.group(1))
                    if w > max_w:
                        max_w = w
    return max_w

def find_max_month_weight():
    """扫描所有有动态的月份目录，返回最大的月份 weight，若无则返回 0"""
    max_w = 0
    for item in os.listdir('.'):
        if os.path.isdir(item) and re.match(r'^\d{4}-\d{1,2}$', item):
            # 检查是否有动态（子文件夹）
            has_posts = False
            for sub in os.listdir(item):
                if os.path.isdir(os.path.join(item, sub)):
                    has_posts = True
                    break
            if has_posts:
                idx_path = os.path.join(item, '_index.md')
                if os.path.isfile(idx_path):
                    with open(idx_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    m = re.search(r'^---\n.*?^weight:\s*(\d+)\s*$', content, re.MULTILINE | re.DOTALL)
                    if m:
                        w = int(m.group(1))
                        if w > max_w:
                            max_w = w
    return max_w

def update_root_index():
    """扫描所有有动态的月份，重新生成根目录 _index.md 的卡片列表"""
    # 收集所有有动态的月份
    months = []
    for item in os.listdir('.'):
        if os.path.isdir(item) and re.match(r'^\d{4}-\d{1,2}$', item):
            has_posts = False
            for sub in os.listdir(item):
                if os.path.isdir(os.path.join(item, sub)):
                    has_posts = True
                    break
            if has_posts:
                y, m = map(int, item.split('-'))
                months.append((y, m, item))
    # 按年月降序
    months.sort(key=lambda x: (x[0], x[1]), reverse=True)

    if not months:
        # 无动态，不更新
        return

    latest = months[0][2]
    history = [m[2] for m in months[1:]]

    # 生成卡片块
    latest_card = f"""{{{{< cards >}}}}
    {{{{< card link="./{latest}" title="{latest.replace("-","年")}月的内容">}}}}
{{{{< /cards >}}}}"""

    history_cards = ""
    for m in history:
        history_cards += f"""{{{{< cards >}}}}
    {{{{< card link="./{m}" title="{m.replace("-","年")}月的内容">}}}}
{{{{< /cards >}}}}
"""

    root_index = '_index.md'
    if not os.path.isfile(root_index):
        print("警告：根目录 _index.md 不存在，跳过更新")
        return

    with open(root_index, 'r', encoding='utf-8') as f:
        content = f.read()

    # 替换最新板块内容（从“**最新动态板块**：”到“**历史板块**：”之前）
    pattern_latest = r'(\*\*最新动态板块\*\*：)\s*.*?(?=\*\*历史板块\*\*：)'
    repl_latest = r'\1\n\n' + latest_card + '\n\n'
    content = re.sub(pattern_latest, repl_latest, content, flags=re.DOTALL)

    # 替换历史板块内容（从“**历史板块**：”到文件末尾）
    pattern_history = r'(\*\*历史板块\*\*：)\s*.*$'
    repl_history = r'\1\n\n' + history_cards
    content = re.sub(pattern_history, repl_history, content, flags=re.DOTALL)

    with open(root_index, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    year, month, day, hour, minute = get_current_time()
    month_dir = f"{year}-{month}"
    subfolder = f"{day}-{hour:02d}{minute:02d}"

    print(f"📅 当前时间：{year}年{month}月{day}日 {hour:02d}:{minute:02d}")
    print(f"📁 月份目录：{month_dir}")
    print(f"📁 子文件夹：{subfolder}")

    # 1. 输入标题
    title = get_user_input("请输入动态标题: ").strip()
    if not title:
        print("⚠️ 标题不能为空")
        sys.exit(1)

    # 2. 编辑正文
    print("📝 正在打开 Vim 编辑器，请编写正文（完成后 :wq）...")
    body = edit_content_with_vim()
    if not body.strip():
        print("⚠️ 正文为空，是否继续？(y/n)")
        if input().lower() != 'y':
            sys.exit(0)

    # 3. 创建月份目录
    os.makedirs(month_dir, exist_ok=True)

    # 4. 计算文章 weight
    max_article_weight = find_max_weight_in_month(month_dir)
    new_article_weight = max_article_weight + 1

    # 5. 创建子文件夹并生成 index.md
    target_dir = os.path.join(month_dir, subfolder)
    os.makedirs(target_dir, exist_ok=True)
    target_file = os.path.join(target_dir, 'index.md')

    # front matter
    front_matter = f"""---
title: "{title}"
comments: true
authors:
  - name: {AUTHOR_NAME}
    link: {AUTHOR_LINK}
    image: {AUTHOR_IMAGE}
weight: {new_article_weight}
---
"""
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(front_matter + body)

    print(f"✅ 文章已创建：{target_file}")

    # 6. 处理月份 _index.md
    month_index = os.path.join(month_dir, '_index.md')
    month_title = f"{year}年{month}月"

    # 判断是否存在，不存在则创建 front matter
    if os.path.isfile(month_index):
        with open(month_index, 'r', encoding='utf-8') as f:
            content = f.read()
        # 提取 front matter 和 body
        fm_match = re.search(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
        if fm_match:
            fm_text = fm_match.group(1)
            body_text = fm_match.group(2)
            # 检查是否有 weight，若无则补充（但一般会有）
            if not re.search(r'^weight:', fm_text, re.MULTILINE):
                # 计算月份 weight
                month_weight = find_max_month_weight() + 1
                fm_text += f"\nweight: {month_weight}"
        else:
            # 格式异常，重新创建
            month_weight = find_max_month_weight() + 1
            fm_text = f"title: {month_title}\nweight: {month_weight}"
            body_text = ""
    else:
        # 新建
        month_weight = find_max_month_weight() + 1
        fm_text = f"title: {month_title}\nweight: {month_weight}"
        body_text = ""

    # 生成新条目摘要
    # 取正文纯文本前20个字符
    plain_body = ' '.join(body.split())  # 去除多余空白
    if len(plain_body) <= 20:
        summary = plain_body
        link_text = "查看更多"
    else:
        summary = plain_body[:20] + "..."
        link_text = "查看全文"

    entry = f"""## {title}

{summary}

[{link_text}→](./{subfolder})

*<span style="color:gray">{year}-{month}-{day} {hour:02d}:{minute:02d}</span>*
"""

    # 插入到 body 开头
    new_body = entry + "\n" + body_text
    new_content = f"---\n{fm_text}\n---\n{new_body}"

    with open(month_index, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✅ 月份索引已更新：{month_index}")

    # 7. 更新根目录 _index.md（重新扫描所有月份）
    update_root_index()
    print("✅ 根目录 _index.md 已更新")

    print("🎉 发布成功！")

if __name__ == "__main__":
    main()