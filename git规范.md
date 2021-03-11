# Gitlab flow流程

### ![img](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015080501.png)

## 一、功能驱动

指需求是开发的起点，先有需求再有功能分支（feture branch) 或者 补丁分支（hotfix branch)，完成后开发后，该分支就合并到主分支，然后被删除

## 二、流程

**第零步：git clone**

```
git clone https://github.com/cruise``-automation``/webviz.git
```

**第一步：新建分支**

```
# 获取主干最新代码``$ git checkout master``$ git pull` `# 新建一个开发分支myfeature``$ git checkout -b myfeature
```

**第二步：提交分支commit**

```
$ git add --all``$ git status``
$ git commit --verbose
```

git add 命令的all参数，表示保存所有变化（包括新建、修改和删除）。从Git 2.0开始，all是 git add 的默认参数，所以也可以用 git add . 代替。

git status 命令，用来查看发生变动的文件。

git commit 命令的verbose参数，会列出 [diff](http://www.ruanyifeng.com/blog/2012/08/how_to_read_diff.html) 的结果。

**第三步：撰写提交信息**

```
Present-tense summary under 50 characters` `* More information about commit (under 72 characters).``* More information about commit (under 72 characters).` `http:``//project``.management-system.com``/ticket/123
```

提交commit时，必须给出完整扼要的提交信息，上面是一个范本。第一行是不超过50个字的提要，然后空一行，罗列出改动原因、主要变动、以及需要注意的问题。最后，提供对应的网址（比如Bug ticket）。



分支的开发过程中，要经常与主干保持同步。

**第四步：与主干同步**

```
$ git fetch origin``$ git rebase origin``/master
```

分支开发完成后，很可能有一堆commit，但是合并到主干的时候，往往希望只有一个（或最多两三个）commit，这样不仅清晰，也容易管理。

那么，怎样才能将多个commit合并呢？这就要用到 git rebase 命令。

**第五步：合并commit**

```
$ git rebase -i origin``/master
```



合并commit后，就可以推送当前分支到远程仓库了。

**第六步：推送到远程仓库**

```
$ git push --force origin myfeature
```

git push命令要加上force参数，因为rebase以后，分支历史改变了，跟远程分支不一定兼容，有可能要强行推送



**第七步：发出Merge Requests**

```
code.deeproute.ai/ 可以看到Merge Request
```

提交到远程仓库以后，就可以发出 Pull Request 到master分支，然后请求别人进行代码review，确认可以合并到master。

## 三、git命令清单

http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html





## 拉新的proj

1. 首先，选择一个合适的地方(切换到磁盘$cd /d，创建一个空目录：

> $ mkdir <projName>(make directory)
>
> $ cd <projName>（change directory)
>
> $ pwd 显示当前路径(Print working directory )
>
> --
>
> $ ls -ah 显示隐藏文件夹（可以看到 .git目录

2. 拿代码：分为clone拿新的和pull update自己的本地代码

> 通过`git init`命令把这个目录变成Git可以管理的仓库：$ git init
>
> clone某个分支：$ git clone -b fix-bom-value-can't-change <url>
>
> 打开代码：$ code .

- git clone是把整个git项目拷贝下来，包括里面的日志信息，git项目里的分支，你也可以直接切换、使用里面的分支等等
- git pull相当于git fetch和git merge。其意思是先从远程下载git项目里的文件，然后将文件与本地的分支进行merge。

> 如果是pull 别人的update的commit
>
> 1. 将远程制定的branch pull到 本地制定branch上：$ git pull origin <remote branch name>:<local branch name> 
>
> （注：命令里的尖括号<>只是包裹中文的标识，方便你看的，实际使用时不用写，不过冒号需要）
>
> 2. 【**推荐**】将远程指定分支 pull 到本地当前分支上：$ git pull origin <remote branch name>
> 3. 将与本地当前分支同名的远程分支 pull到本地当前分值上(需要关联，见下)：$ git pull
>
> 在克隆远程项目的时候，本地分支会自动与远程仓库建立追踪关系，可以使用默认的origin来替代远程仓库名

3. 修改代码完后

> 先add到index暂存区（提交修改）：$ git add .  
>
> 再从暂存区commit到当然分支（提交新文件）：$ git commit -m'comment'
>
> // 可以用 -m "can't fix something" 包含特殊符号
>
> // `$ git add <filename>` 可以反复使用添加多个文件 然后一次性commit完成

**git commit**是将本地修改过的文件提交到本地库中。 **git push**是将本地库中的最新信息发送给远程库

git commit相当于保存一个快照，以后可以根据commit的tag号版本回退。

4. push到远程仓库

> 1. 本地当前分支 push 到远程指定分支上： $ git push origin <本地分支名>:<远程分支名>
>
> 2. 【**推荐**】将本地当前分支 推送到 与本地当前分支同名的远程分支上： $ git push origin <local branch name>
>
> 3. 本地分支 push 到与本地当前分支同名的 远程分支上（需要先关联远程分支）： $git push origin
>
>    将本地的分支与远程同名分支相**关联**：$git push -u origin <local branch name>

### 其他流程之外 （分支默认master，远程库默认origin

> 删除远程(gitlab上)分支:`$ git push origin --delete <BranchName>`
>
> 删除本地分支:`$ git branch -d <BranchName>`
>
> 删除一个没有被合并过的分支: `$ git branch -D <name>`

> 1. 查看项目的分支们(包括本地和远程) : `$ git branch -a`
>
>    `git branch`不带参数,列出本地已经存在的分支，并且在当前分支的前面用`*`标记，加上`-a`参数可以查看所有分支列表，包括本地和远程，远程分支一般会用红色字体标记出来
>
>    <img src="C:\Users\heqianlu\AppData\Roaming\Typora\typora-user-images\image-20210310143140870.png" alt="image-20210310143140870" style="zoom: 25%;" />
>
> 2. checkout远程的dev分支，在本地起名dev分支，并切换到本地的dev分支：`$ git checkout -b dev origin/dev `
>
> 3. 切换回dev分支：`$ git checkout dev`
>
> 4. 查看修改变化**(工作区与版本库的变化）**：`$ git status`
>
> 5. 查看具体怎么修改的： 
>
>    - `$ git diff <filename>` 文件名可有可无，比较的是工作区文件和暂存区文件的区别，就是add的内容
>    -  `$ git diff --cached` ：比较是的暂存区的文件和仓库分支的分支里的区别，就是commit的内容
>    - `$ git diff HEAD` 比较工作区与仓库分支的区别（跨了中间的index暂存区
>
> 6. 查看git的commit历史记录：`$ git log` //回车慢慢显示，退出Q键
>
>    `git log --graph` 看到分支合并图
>
> 7. 版本回退：https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192
>
> 8. `$ git add` 的反向命令: `$ git checkout` 撤销工作区修改，把暂存区的最新版本转移到工作区
>
> 9. `$ git commit`的反向命令：`$ git reset head`仓库最新版本 转移到工作区
>
> 10. 撤销修改：
>
>     1. 当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令`git checkout -- file`。（注意--两边的空格space）
>     2. 当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令`git reset HEAD <file>`，就回到了场景1，第二步按场景1操作。 或者直接`$ git check HEAD <file>`
>     3. 已经提交了不合适的修改到版本库时，想要撤销本次提交，参考[版本回退](https://www.liaoxuefeng.com/wiki/896043488029600/897013573512192)一节，不过前提是没有推送到远程库。
>     4. 新增的`$ git switch `和`$ git restore` 
>
> 11. 在版本库中删除某个文件： `$ git rm <file name>` 然后再`$ git commit -m"....."`
>
>     `$ rm <fileName>` 删除文件，在git中视为删除工作区的文件
>
>     `$ git rm --cahed <file>`仅仅删除暂存区的文件，不会删除工作区
>
>     如果误删了，但是因为版本库里还有可以恢复到最新版本：`$ git checkout -- <fileName>`, checkout本质上是用版本库里的版本替代工作区里的版本。
>
>     1. 工作区文件删除，恢复文件：`$ git restore <fileName>`
>     2. 工作区，版本库文件都删除。 `$ git reset --hard HEAD^` 指针恢复到上一个版本号
>
> 12. 查看远程库的信息: `$ git remote -v` 再根据名字删除origin `$ git remote rm origin`但是这里的删除是解除本地和远程的绑定关系，并没有物理的删除了远程库，远程库没有改动。
>
> 13. 分支的管理（https://www.liaoxuefeng.com/wiki/896043488029600/900003767775424指针的图示）
>
>     1. `$ git checkout -b dev ` `$ git switch -c <name>` 创建dev分支且切换到dev分支
>     2. `$ git checkout <branchName>` or `$ git switch <name>`
>     3. `$ git branch`查看当前分支
>     4. `$ git merge dev`合并指定分支（dev）到当前分支（master）
>     5. `$ git branch -d dev` 删除dev分支，丢弃一个没有被合并的分支`$ git branch -D <branchName>` 强行删除
>
> 14. 在master分支上修复的bug，想要合并到当前dev分支，可以用`git cherry-pick <commit>`命令，把bug提交的修改“复制”到当前分支，避免重复劳动。
>
> 15. 多人协作的工作模式通常是这样：
>
>     1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；
>     2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；
>     3. 如果合并有冲突，则解决冲突，并在本地提交；
>     4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！
>
>     如果`git pull`提示`no tracking information`，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。
>
> 16. 





### 暂存区的意义：

https://www.liaoxuefeng.com/wiki/896043488029600/897271968352576

”如果没有暂存区的概念，我们在容器中任意的修改commit的时候都会被加入到branch里，但是有可能我们添加一个临时文件，但是我们不想把它commit上去。“

“暂存区就像**购物车**，没到付款的时候你都不确定购物车里的东西全部都是要的。。。每拿一件商品就付一次款。。。那才麻烦大了”