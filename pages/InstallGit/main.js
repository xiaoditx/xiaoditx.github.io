// Git安装配置指南 - 主要JavaScript逻辑

// 全局变量
let gitConfig = {};
let currentStep = 0;
let userMode = '';
let userProfile = {};
let installationOptions = {};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadGitOptions();
    setupEventListeners();
});

// 初始化应用
function initializeApp() {
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // 初始化动画
    animateWelcomeSection();
    
    // 从本地存储加载之前的配置
    loadSavedConfig();
}

// 加载Git选项配置
async function loadGitOptions() {
    try {
        // 在实际部署时，这个JSON文件会从服务器加载
        // 目前在开发阶段，我们使用内嵌的配置数据
        installationOptions = {
            "gitInstallationOptions": {
                "version": "2.48.1",
                "lastUpdated": "2025-01-01",
                "steps": [
                    {
                        "id": "installation_directory",
                        "stepNumber": 1,
                        "title": "选择安装目录",
                        "description": "选择Git的安装位置，建议使用默认位置或自定义到合适的目录",
                        "type": "radio",
                        "required": true,
                        "defaultValue": "C:\\Program Files\\Git",
                        "recommendation": "建议使用默认路径，或改为D盘以节省C盘空间",
                        "options": [
                            {
                                "label": "默认位置 (C:\\Program Files\\Git)",
                                "value": "C:\\Program Files\\Git",
                                "description": "安装到C盘的Program Files目录",
                                "recommended": true
                            },
                            {
                                "label": "自定义位置",
                                "value": "custom",
                                "description": "选择自定义安装目录，如D:\\Git",
                                "recommended": false
                            }
                        ],
                        "output": "选择安装目录为: {value}",
                        "tips": "如果C盘空间不足，可以安装到D盘或其他分区"
                    },
                    {
                        "id": "default_editor",
                        "stepNumber": 2,
                        "title": "选择Git默认编辑器",
                        "description": "选择Git在需要编辑文本时使用的默认编辑器",
                        "type": "radio",
                        "required": true,
                        "defaultValue": "notepad++",
                        "recommendation": "新手建议选择Notepad++或VS Code，Vim需要学习成本",
                        "options": [
                            {
                                "label": "Vim",
                                "value": "vim",
                                "description": "功能强大的命令行编辑器，但需要学习",
                                "recommended": false
                            },
                            {
                                "label": "Notepad++",
                                "value": "notepad++",
                                "description": "免费的源代码编辑器，功能丰富，适合新手",
                                "recommended": true
                            },
                            {
                                "label": "Visual Studio Code",
                                "value": "vscode",
                                "description": "微软开发的免费代码编辑器，功能强大",
                                "recommended": true
                            },
                            {
                                "label": "Sublime Text",
                                "value": "sublime",
                                "description": "轻量级的代码编辑器",
                                "recommended": false
                            },
                            {
                                "label": "Notepad",
                                "value": "notepad",
                                "description": "Windows自带的记事本，功能简单",
                                "recommended": false
                            }
                        ],
                        "output": "选择默认编辑器为: {value}",
                        "tips": "如果选择的编辑器未安装，需要先安装才能继续"
                    },
                    {
                        "id": "default_branch_name",
                        "stepNumber": 3,
                        "title": "选择默认分支名称",
                        "description": "决定新仓库的默认分支名称，这是Git 2.28版本后的新功能",
                        "type": "radio",
                        "required": true,
                        "defaultValue": "main",
                        "recommendation": "建议选择'main'，这是现代标准",
                        "options": [
                            {
                                "label": "Let Git decide",
                                "value": "git_decide",
                                "description": "让Git自动选择（当前为master，未来可能改变）",
                                "recommended": false
                            },
                            {
                                "label": "main",
                                "value": "main",
                                "description": "使用'main'作为默认分支名，符合现代标准",
                                "recommended": true
                            },
                            {
                                "label": "master",
                                "value": "master",
                                "description": "使用传统的'master'作为默认分支名",
                                "recommended": false
                            }
                        ],
                        "output": "选择默认分支名称为: {value}",
                        "tips": "很多团队已将默认分支从master重命名为main"
                    },
                    {
                        "id": "path_environment",
                        "stepNumber": 4,
                        "title": "调整PATH环境变量",
                        "description": "选择如何从命令行使用Git，影响Git在系统中的可访问性",
                        "type": "radio",
                        "required": true,
                        "defaultValue": "git_from_command_line_and_3rd_party_tools",
                        "recommendation": "建议选择中间选项，既能从命令行使用，又不会影响系统工具",
                        "options": [
                            {
                                "label": "Use Git from Git Bash only",
                                "value": "git_bash_only",
                                "description": "仅从Git Bash使用Git，不修改PATH",
                                "recommended": false
                            },
                            {
                                "label": "Git from command line and 3rd-party software",
                                "value": "git_from_command_line_and_3rd_party_tools",
                                "description": "从命令行和第三方软件使用Git，推荐选择",
                                "recommended": true
                            },
                            {
                                "label": "Use Git and optional Unix tools from the Command Prompt",
                                "value": "use_git_and_optional_unix_tools",
                                "description": "使用Git和可选的Unix工具，可能覆盖系统工具",
                                "recommended": false
                            }
                        ],
                        "output": "PATH环境变量配置: {value}",
                        "tips": "中间选项是最安全的选择，适合大多数用户"
                    },
                    {
                        "id": "ssh_executable",
                        "stepNumber": 5,
                        "title": "选择SSH可执行文件",
                        "description": "选择Git使用哪个SSH客户端进行安全连接",
                        "type": "radio",
                        "required": true,
                        "defaultValue": "use bundled ssh",
                        "recommendation": "建议使用Git捆绑的OpenSSH，除非有特殊需求",
                        "options": [
                            {
                                "label": "Use bundled OpenSSH",
                                "value": "use bundled ssh",
                                "description": "使用Git捆绑的OpenSSH，推荐选择",
                                "recommended": true
                            },
                            {
                                "label": "Use external SSH",
                                "value": "use external ssh",
                                "description": "使用外部SSH客户端（如PuTTY）",
                                "recommended": false
                            }
                        ],
                        "output": "SSH客户端选择: {value}",
                        "tips": "大多数用户应该选择使用Git捆绑的OpenSSH"
                    },
                    {
                        "id": "https_transport_backend",
                        "stepNumber": 6,
                        "title": "选择HTTPS传输后端",
                        "description": "选择Git在进行HTTPS操作时使用的后端库",
                        "type": "radio",
                        "required": true,
                        "defaultValue": "use openssl",
                        "recommendation": "建议使用OpenSSL，兼容性更好",
                        "options": [
                            {
                                "label": "Use OpenSSL",
                                "value": "use openssl",
                                "description": "使用OpenSSL库，更好的兼容性",
                                "recommended": true
                            },
                            {
                                "label": "Use Windows Secure Channel",
                                "value": "use windows secure channel",
                                "description": "使用Windows安全通道，与企业CA更好集成",
                                "recommended": false
                            }
                        ],
                        "output": "HTTPS传输后端: {value}",
                        "tips": "OpenSSL通常提供更好的兼容性"
                    },
                    {
                        "id": "line_ending_conversion",
                        "stepNumber": 7,
                        "title": "配置行尾符号转换",
                        "description": "选择Git如何处理不同操作系统间的行尾符差异",
                        "type": "radio",
                        "required": true,
                        "defaultValue": "checkout windows style commit unix style",
                        "recommendation": "建议选择第一个选项，这是Windows下的标准配置",
                        "options": [
                            {
                                "label": "Checkout Windows-style, commit Unix-style",
                                "value": "checkout windows style commit unix style",
                                "description": "检出时使用Windows风格(CRLF)，提交时使用Unix风格(LF)",
                                "recommended": true
                            },
                            {
                                "label": "Checkout as-is, commit Unix-style",
                                "value": "checkout as is commit unix style",
                                "description": "检出时保持原样，提交时使用Unix风格",
                                "recommended": false
                            },
                            {
                                "label": "Checkout as-is, commit as-is",
                                "value": "checkout as is commit as is",
                                "description": "完全不做任何转换，保持文件原样",
                                "recommended": false
                            }
                        ],
                        "output": "行尾符号转换配置: {value}",
                        "tips": "第一个选项最适合Windows用户，避免跨平台问题"
                    },
                    {
                        "id": "terminal_emulator",
                        "stepNumber": 8,
                        "title": "配置终端模拟器",
                        "description": "选择与Git Bash一起使用的终端模拟器",
                        "type": "radio",
                        "required": true,
                        "defaultValue": "use mintty",
                        "recommendation": "建议使用Mintty，功能更强大",
                        "options": [
                            {
                                "label": "Use MinTTY",
                                "value": "use mintty",
                                "description": "使用MinTTY终端，功能更强大，支持更多特性",
                                "recommended": true
                            },
                            {
                                "label": "Use Windows' default console",
                                "value": "use windows default console",
                                "description": "使用Windows默认控制台窗口",
                                "recommended": false
                            }
                        ],
                        "output": "终端模拟器选择: {value}",
                        "tips": "MinTTY提供更好的Unicode支持和窗口大小调整"
                    }
                ],
                "userProfiles": {
                    "beginner": {
                        "name": "初学者",
                        "description": "首次安装Git的用户",
                        "recommendations": {
                            "default_editor": "notepad++",
                            "default_branch_name": "main",
                            "path_environment": "git_from_command_line_and_3rd_party_tools",
                            "ssh_executable": "use bundled ssh",
                            "https_transport_backend": "use openssl",
                            "line_ending_conversion": "checkout windows style commit unix style",
                            "terminal_emulator": "use mintty"
                        }
                    },
                    "experienced": {
                        "name": "有经验的开发者",
                        "description": "有Git使用经验的开发者",
                        "recommendations": {
                            "default_editor": "vscode",
                            "default_branch_name": "main",
                            "path_environment": "git_from_command_line_and_3rd_party_tools",
                            "ssh_executable": "use bundled ssh",
                            "https_transport_backend": "use openssl",
                            "line_ending_conversion": "checkout windows style commit unix style",
                            "terminal_emulator": "use mintty"
                        }
                    }
                }
            }
        };
        
        console.log('Git选项配置加载完成');
    } catch (error) {
        console.error('加载Git选项配置失败:', error);
        showNotification('配置加载失败，请刷新页面重试', 'error');
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 键盘导航支持
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft' && currentStep > 0) {
            previousStep();
        } else if (event.key === 'ArrowRight' && currentStep < installationOptions.gitInstallationOptions.steps.length - 1) {
            nextStep();
        }
    });
    
    // 窗口大小变化时的响应式处理
    window.addEventListener('resize', function() {
        // 可以在这里添加响应式逻辑
    });
}

// 动画：欢迎区域淡入
function animateWelcomeSection() {
    anime({
        targets: '.fade-in',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutQuart',
        delay: 200
    });
}

// 选择模式
function selectMode(mode) {
    userMode = mode;
    
    if (mode === 'beginner') {
        showQuestionnaire();
    } else {
        userProfile = installationOptions.gitInstallationOptions.userProfiles.experienced;
        startConfiguration();
    }
    
    // 隐藏欢迎区域
    anime({
        targets: '#welcome-section',
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 400,
        easing: 'easeInQuart',
        complete: function() {
            document.getElementById('welcome-section').classList.add('hidden');
        }
    });
}

// 显示问卷
function showQuestionnaire() {
    const questionnaireSection = document.getElementById('questionnaire-section');
    const questionsContainer = document.getElementById('questions-container');
    
    const questions = [
        {
            id: 'git_experience',
            question: '您是否曾经安装或使用过Git？',
            type: 'radio',
            options: [
                { value: 'never', label: '从未使用过' },
                { value: 'some', label: '有一些使用经验' },
                { value: 'experienced', label: '有丰富的使用经验' }
            ]
        },
        {
            id: 'command_line',
            question: '您对命令行操作的熟悉程度如何？',
            type: 'radio',
            options: [
                { value: 'none', label: '完全不熟悉' },
                { value: 'basic', label: '了解一些基本命令' },
                { value: 'advanced', label: '熟练使用命令行' }
            ]
        },
        {
            id: 'github_account',
            question: '您是否拥有GitHub或其他代码托管平台账户？',
            type: 'radio',
            options: [
                { value: 'no', label: '没有' },
                { value: 'yes', label: '有，GitHub账户' },
                { value: 'others', label: '有，其他平台账户' }
            ]
        },
        {
            id: 'ssh_knowledge',
            question: '您是否了解SSH密钥的概念和用途？',
            type: 'radio',
            options: [
                { value: 'no', label: '不了解' },
                { value: 'heard', label: '听说过，但不了解详情' },
                { value: 'yes', label: '了解并使用过' }
            ]
        }
    ];
    
    questionsContainer.innerHTML = questions.map((q, index) => `
        <div class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 class="font-semibold mb-3">${q.question}</h4>
            <div class="space-y-2">
                ${q.options.map(option => `
                    <label class="flex items-center space-x-3 cursor-pointer">
                        <input type="${q.type}" name="question_${q.id}" value="${option.value}" 
                               class="radio-custom" onchange="updateQuestionAnswer('${q.id}', '${option.value}')">
                        <span>${option.label}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    questionnaireSection.classList.remove('hidden');
    
    // 动画显示问卷
    anime({
        targets: '#questionnaire-section',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuart'
    });
}

// 更新问卷答案
function updateQuestionAnswer(questionId, value) {
    userProfile[questionId] = value;
}

// 完成问卷
function completeQuestionnaire() {
    // 根据问卷结果确定用户配置
    const experience = userProfile.git_experience;
    const commandLine = userProfile.command_line;
    
    if (experience === 'never' || commandLine === 'none') {
        userProfile = installationOptions.gitInstallationOptions.userProfiles.beginner;
    } else {
        userProfile = installationOptions.gitInstallationOptions.userProfiles.experienced;
    }
    
    // 隐藏问卷
    anime({
        targets: '#questionnaire-section',
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 400,
        easing: 'easeInQuart',
        complete: function() {
            document.getElementById('questionnaire-section').classList.add('hidden');
            startConfiguration();
        }
    });
}

// 开始配置
function startConfiguration() {
    currentStep = 0;
    gitConfig = {};
    
    // 显示配置界面
    const configSection = document.getElementById('config-section');
    configSection.classList.remove('hidden');
    
    // 动画显示配置界面
    anime({
        targets: '#config-section',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        easing: 'easeOutQuart'
    });
    
    // 显示第一步
    showCurrentStep();
}

// 显示当前步骤
function showCurrentStep() {
    const step = installationOptions.gitInstallationOptions.steps[currentStep];
    const stepContent = document.getElementById('step-content');
    
    // 更新进度条
    updateProgress();
    
    // 生成步骤内容
    stepContent.innerHTML = generateStepContent(step);
    
    // 更新预览面板
    updateConfigPreview();
    
    // 动画显示步骤内容
    anime({
        targets: '#step-content',
        opacity: [0, 1],
        translateX: [20, 0],
        duration: 400,
        easing: 'easeOutQuart'
    });
}

// 生成步骤内容
function generateStepContent(step) {
    let content = `
        <div class="mb-6">
            <div class="flex items-center mb-4">
                <div class="step-indicator active mr-3">${step.stepNumber}</div>
                <h3 class="text-2xl font-bold">${step.title}</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">${step.description}</p>
            ${step.tips ? `<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                <p class="text-sm text-blue-800 dark:text-blue-200">💡 ${step.tips}</p>
            </div>` : ''}
        </div>
    `;
    
    // 根据类型生成不同的表单元素
    if (step.type === 'radio') {
        content += generateRadioOptions(step);
    } else if (step.type === 'checkbox') {
        content += generateCheckboxOptions(step);
    } else if (step.type === 'text') {
        content += generateTextInput(step);
    }
    
    return content;
}

// 生成单选按钮选项
function generateRadioOptions(step) {
    let html = '<div class="space-y-3">';
    
    step.options.forEach(option => {
        const isRecommended = option.recommended || 
                            (userProfile.recommendations && userProfile.recommendations[step.id] === option.value);
        const isSelected = gitConfig[step.id] === option.value || 
                          (!gitConfig[step.id] && option.value === step.defaultValue);
        
        // 如果还没有选择且这是默认选项，设置默认值
        if (!gitConfig[step.id] && option.value === step.defaultValue) {
            gitConfig[step.id] = option.value;
        }
        
        html += `
            <div class="option-card ${isRecommended ? 'recommended' : ''} ${isSelected ? 'selected' : ''}" 
                 onclick="selectOption('${step.id}', '${option.value}')">
                <div class="flex items-start space-x-3">
                    <input type="radio" name="${step.id}" value="${option.value}" 
                           class="radio-custom mt-1" ${isSelected ? 'checked' : ''}>
                    <div class="flex-1">
                        <h4 class="font-semibold ${isRecommended ? 'text-green-700 dark:text-green-400' : ''}">${option.label}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">${option.description}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// 生成复选框选项
function generateCheckboxOptions(step) {
    let html = '<div class="space-y-3">';
    
    step.options.forEach(option => {
        const isRecommended = option.recommended;
        const isSelected = gitConfig[step.id] && gitConfig[step.id].includes(option.value);
        
        html += `
            <div class="option-card ${isRecommended ? 'recommended' : ''} ${isSelected ? 'selected' : ''}" 
                 onclick="toggleCheckbox('${step.id}', '${option.value}')">
                <div class="flex items-start space-x-3">
                    <input type="checkbox" value="${option.value}" 
                           class="checkbox-custom mt-1" ${isSelected ? 'checked' : ''}>
                    <div class="flex-1">
                        <h4 class="font-semibold ${isRecommended ? 'text-green-700 dark:text-green-400' : ''}">${option.label}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">${option.description}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

// 生成文本输入
function generateTextInput(step) {
    const currentValue = gitConfig[step.id] || step.defaultValue || '';
    
    return `
        <div class="space-y-3">
            <input type="text" id="${step.id}" value="${currentValue}" 
                   class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   onchange="updateTextValue('${step.id}', this.value)">
            <p class="text-sm text-gray-600 dark:text-gray-300">${step.recommendation}</p>
        </div>
    `;
}

// 选择选项
function selectOption(stepId, value) {
    gitConfig[stepId] = value;
    
    // 更新UI
    const cards = document.querySelectorAll(`[onclick*="${stepId}"]`);
    cards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // 选中当前卡片
    event.currentTarget.classList.add('selected');
    
    // 更新预览
    updateConfigPreview();
    
    // 添加选择动画
    anime({
        targets: event.currentTarget,
        scale: [1, 1.02, 1],
        duration: 200,
        easing: 'easeOutQuart'
    });
}

// 切换复选框
function toggleCheckbox(stepId, value) {
    if (!gitConfig[stepId]) {
        gitConfig[stepId] = [];
    }
    
    const index = gitConfig[stepId].indexOf(value);
    if (index > -1) {
        gitConfig[stepId].splice(index, 1);
        event.currentTarget.classList.remove('selected');
    } else {
        gitConfig[stepId].push(value);
        event.currentTarget.classList.add('selected');
    }
    
    // 更新预览
    updateConfigPreview();
}

// 更新文本值
function updateTextValue(stepId, value) {
    gitConfig[stepId] = value;
    updateConfigPreview();
}

// 更新进度条
function updateProgress() {
    const totalSteps = installationOptions.gitInstallationOptions.steps.length;
    const progress = ((currentStep + 1) / totalSteps) * 100;
    
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `步骤 ${currentStep + 1} / ${totalSteps}`;
    
    // 更新导航按钮状态
    document.getElementById('prev-btn').disabled = currentStep === 0;
    document.getElementById('next-btn').textContent = 
        currentStep === totalSteps - 1 ? '完成配置' : '下一步';
}

// 上一步
function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        showCurrentStep();
    }
}

// 下一步
function nextStep() {
    const currentStepData = installationOptions.gitInstallationOptions.steps[currentStep];
    
    // 检查必填项
    if (currentStepData.required && !gitConfig[currentStepData.id]) {
        showNotification('请完成当前步骤的配置', 'warning');
        return;
    }
    
    if (currentStep < installationOptions.gitInstallationOptions.steps.length - 1) {
        currentStep++;
        showCurrentStep();
    } else {
        // 完成配置
        completeConfiguration();
    }
}

// 更新配置预览
function updateConfigPreview() {
    const previewContainer = document.getElementById('config-preview');
    const completedSteps = Object.keys(gitConfig).filter(key => gitConfig[key] !== undefined && gitConfig[key] !== '');
    
    if (completedSteps.length === 0) {
        previewContainer.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-sm">尚未进行任何配置</p>';
        return;
    }
    
    let previewHTML = '';
    completedSteps.forEach(stepId => {
        const step = installationOptions.gitInstallationOptions.steps.find(s => s.id === stepId);
        if (step) {
            const value = Array.isArray(gitConfig[stepId]) ? 
                         gitConfig[stepId].join(', ') : 
                         gitConfig[stepId];
            
            previewHTML += `
                <div class="text-sm">
                    <div class="font-medium text-gray-700 dark:text-gray-300">${step.title}</div>
                    <div class="text-gray-500 dark:text-gray-400">${value}</div>
                </div>
            `;
        }
    });
    
    previewContainer.innerHTML = previewHTML;
}

// 完成配置
function completeConfiguration() {
    // 保存配置到本地存储
    localStorage.setItem('gitConfig', JSON.stringify(gitConfig));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // 显示成功消息
    showNotification('配置完成！正在生成安装指南...', 'success');
    
    // 跳转到指南页面
    setTimeout(() => {
        window.location.href = 'guide.html';
    }, 1500);
}

// 生成安装指南
function generateGuide() {
    if (Object.keys(gitConfig).length === 0) {
        showNotification('请先完成一些配置再生成指南', 'warning');
        return;
    }
    
    // 保存当前配置
    localStorage.setItem('gitConfig', JSON.stringify(gitConfig));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // 跳转到指南页面
    window.location.href = 'guide.html';
}

// 主题切换
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // 主题切换动画
    anime({
        targets: 'body',
        duration: 300,
        easing: 'easeOutQuart'
    });
}

// 更新主题图标
function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示动画
    anime({
        targets: notification,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 300,
        easing: 'easeOutQuart'
    });
    
    // 自动隐藏
    setTimeout(() => {
        anime({
            targets: notification,
            opacity: [1, 0],
            translateX: [0, 100],
            duration: 300,
            easing: 'easeInQuart',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// 加载保存的配置
function loadSavedConfig() {
    const savedConfig = localStorage.getItem('gitConfig');
    const savedProfile = localStorage.getItem('userProfile');
    
    if (savedConfig) {
        try {
            gitConfig = JSON.parse(savedConfig);
        } catch (e) {
            console.error('加载保存的配置失败:', e);
        }
    }
    
    if (savedProfile) {
        try {
            userProfile = JSON.parse(savedProfile);
        } catch (e) {
            console.error('加载保存的用户资料失败:', e);
        }
    }
}

// 重置配置
function resetConfig() {
    if (confirm('确定要重置所有配置吗？这将清除所有已保存的设置。')) {
        gitConfig = {};
        userProfile = {};
        localStorage.removeItem('gitConfig');
        localStorage.removeItem('userProfile');
        
        currentStep = 0;
        showCurrentStep();
        
        showNotification('配置已重置', 'info');
    }
}

// 导出功能
function exportConfig() {
    const configData = {
        gitConfig: gitConfig,
        userProfile: userProfile,
        timestamp: new Date().toISOString(),
        version: installationOptions.gitInstallationOptions.version
    };
    
    const dataStr = JSON.stringify(configData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `git-config-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('配置已导出', 'success');
}

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时保存当前状态
        if (Object.keys(gitConfig).length > 0) {
            localStorage.setItem('gitConfig', JSON.stringify(gitConfig));
        }
    }
});