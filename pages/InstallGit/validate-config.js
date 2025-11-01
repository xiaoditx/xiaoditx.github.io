#!/usr/bin/env node

/**
 * Git安装配置指南 - 配置文件验证工具
 * 用于验证git-config-options.json文件的完整性和正确性
 */

const fs = require('fs');
const path = require('path');

// 颜色输出函数
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

function colorize(text, color) {
    return colors[color] + text + colors.reset;
}

// 日志函数
function logInfo(message) {
    console.log(colorize('ℹ ', 'blue') + message);
}

function logSuccess(message) {
    console.log(colorize('✓ ', 'green') + message);
}

function logWarning(message) {
    console.log(colorize('⚠ ', 'yellow') + message);
}

function logError(message) {
    console.log(colorize('✗ ', 'red') + message);
}

function logHeader(message) {
    console.log('\n' + colorize('═', 'cyan').repeat(60));
    console.log(colorize(message, 'bright'));
    console.log(colorize('═', 'cyan').repeat(60));
}

// 验证器类
class ConfigValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.config = null;
    }

    // 加载配置文件
    loadConfig(filePath) {
        try {
            const fullPath = path.resolve(filePath);
            if (!fs.existsSync(fullPath)) {
                throw new Error(`配置文件不存在: ${fullPath}`);
            }

            const content = fs.readFileSync(fullPath, 'utf8');
            this.config = JSON.parse(content);
            logSuccess(`成功加载配置文件: ${fullPath}`);
            return true;
        } catch (error) {
            logError(`加载配置文件失败: ${error.message}`);
            return false;
        }
    }

    // 验证配置结构
    validateStructure() {
        logHeader('验证配置结构');
        
        if (!this.config) {
            this.errors.push('配置对象为空');
            return false;
        }

        // 检查顶层结构
        if (!this.config.gitInstallationOptions) {
            this.errors.push('缺少 gitInstallationOptions 顶层对象');
            return false;
        }

        const options = this.config.gitInstallationOptions;
        
        // 检查必需字段
        const requiredFields = ['version', 'steps', 'userProfiles'];
        for (const field of requiredFields) {
            if (!options[field]) {
                this.errors.push(`缺少必需字段: ${field}`);
            }
        }

        // 验证版本号格式
        if (options.version && !/^\d+\.\d+\.\d+$/.test(options.version)) {
            this.warnings.push(`版本号格式可能不正确: ${options.version}`);
        }

        // 验证steps数组
        if (options.steps && Array.isArray(options.steps)) {
            this.validateSteps(options.steps);
        } else {
            this.errors.push('steps 必须是数组类型');
        }

        // 验证userProfiles对象
        if (options.userProfiles && typeof options.userProfiles === 'object') {
            this.validateUserProfiles(options.userProfiles);
        } else {
            this.errors.push('userProfiles 必须是对象类型');
        }

        this.printValidationResults();
        return this.errors.length === 0;
    }

    // 验证步骤配置
    validateSteps(steps) {
        logInfo(`验证 ${steps.length} 个配置步骤`);
        
        const stepNumbers = new Set();
        const stepIds = new Set();

        steps.forEach((step, index) => {
            const stepPrefix = `步骤 ${index + 1}`;
            
            // 检查必需字段
            const requiredFields = ['id', 'stepNumber', 'title', 'description', 'type'];
            for (const field of requiredFields) {
                if (!step[field]) {
                    this.errors.push(`${stepPrefix}: 缺少必需字段 ${field}`);
                }
            }

            // 验证stepNumber
            if (step.stepNumber) {
                if (typeof step.stepNumber !== 'number' || step.stepNumber <= 0) {
                    this.errors.push(`${stepPrefix}: stepNumber 必须是正整数`);
                } else if (stepNumbers.has(step.stepNumber)) {
                    this.errors.push(`${stepPrefix}: stepNumber ${step.stepNumber} 重复`);
                } else {
                    stepNumbers.add(step.stepNumber);
                }
            }

            // 验证id
            if (step.id) {
                if (typeof step.id !== 'string') {
                    this.errors.push(`${stepPrefix}: id 必须是字符串`);
                } else if (stepIds.has(step.id)) {
                    this.errors.push(`${stepPrefix}: id '${step.id}' 重复`);
                } else {
                    stepIds.add(step.id);
                }
            }

            // 验证type
            if (step.type) {
                const validTypes = ['radio', 'checkbox', 'text', 'directory'];
                if (!validTypes.includes(step.type)) {
                    this.errors.push(`${stepPrefix}: type 必须是 ${validTypes.join(', ')} 之一`);
                }
            }

            // 验证options数组（针对radio和checkbox类型）
            if (step.type === 'radio' || step.type === 'checkbox') {
                if (!step.options || !Array.isArray(step.options)) {
                    this.errors.push(`${stepPrefix}: ${step.type} 类型必须包含 options 数组`);
                } else {
                    this.validateOptions(step.options, stepPrefix);
                }
            }

            // 验证defaultValue
            if (step.defaultValue !== undefined) {
                this.validateDefaultValue(step.defaultValue, step, stepPrefix);
            }
        });

        // 检查stepNumber是否连续
        const sortedNumbers = Array.from(stepNumbers).sort((a, b) => a - b);
        for (let i = 0; i < sortedNumbers.length; i++) {
            if (sortedNumbers[i] !== i + 1) {
                this.warnings.push(`stepNumber 不连续，缺少步骤 ${i + 1}`);
                break;
            }
        }
    }

    // 验证选项配置
    validateOptions(options, stepPrefix) {
        const optionLabels = new Set();
        const optionValues = new Set();

        options.forEach((option, optionIndex) => {
            const optionPrefix = `${stepPrefix} 选项 ${optionIndex + 1}`;
            
            // 检查必需字段
            if (!option.label) {
                this.errors.push(`${optionPrefix}: 缺少 label 字段`);
            }
            if (!option.value) {
                this.errors.push(`${optionPrefix}: 缺少 value 字段`);
            }

            // 验证label唯一性
            if (option.label) {
                if (optionLabels.has(option.label)) {
                    this.warnings.push(`${optionPrefix}: label '${option.label}' 重复`);
                } else {
                    optionLabels.add(option.label);
                }
            }

            // 验证value唯一性
            if (option.value) {
                if (optionValues.has(option.value)) {
                    this.warnings.push(`${optionPrefix}: value '${option.value}' 重复`);
                } else {
                    optionValues.add(option.value);
                }
            }
        });
    }

    // 验证默认值
    validateDefaultValue(defaultValue, step, stepPrefix) {
        if (step.type === 'radio') {
            if (!step.options || !step.options.some(opt => opt.value === defaultValue)) {
                this.warnings.push(`${stepPrefix}: defaultValue '${defaultValue}' 不在 options 中`);
            }
        } else if (step.type === 'checkbox') {
            if (!Array.isArray(defaultValue)) {
                this.errors.push(`${stepPrefix}: checkbox 类型的 defaultValue 必须是数组`);
            } else {
                defaultValue.forEach(val => {
                    if (!step.options || !step.options.some(opt => opt.value === val)) {
                        this.warnings.push(`${stepPrefix}: defaultValue 中的 '${val}' 不在 options 中`);
                    }
                });
            }
        }
    }

    // 验证用户配置
    validateUserProfiles(userProfiles) {
        logInfo(`验证 ${Object.keys(userProfiles).length} 个用户配置文件`);
        
        Object.entries(userProfiles).forEach(([profileName, profile]) => {
            const profilePrefix = `用户配置 ${profileName}`;
            
            if (!profile.name) {
                this.warnings.push(`${profilePrefix}: 缺少 name 字段`);
            }
            if (!profile.description) {
                this.warnings.push(`${profilePrefix}: 缺少 description 字段`);
            }
            if (!profile.recommendations || typeof profile.recommendations !== 'object') {
                this.errors.push(`${profilePrefix}: 缺少 recommendations 对象`);
            } else {
                // 验证推荐配置是否存在于步骤中
                Object.keys(profile.recommendations).forEach(key => {
                    const stepExists = this.config.gitInstallationOptions.steps.some(step => step.id === key);
                    if (!stepExists) {
                        this.warnings.push(`${profilePrefix}: recommendations 中的 '${key}' 不存在于步骤中`);
                    }
                });
            }
        });
    }

    // 打印验证结果
    printValidationResults() {
        console.log('\n');
        
        if (this.errors.length === 0 && this.warnings.length === 0) {
            logSuccess('配置文件验证通过！没有发现错误或警告。');
        } else {
            if (this.errors.length > 0) {
                logHeader('错误列表');
                this.errors.forEach(error => logError(error));
            }
            
            if (this.warnings.length > 0) {
                logHeader('警告列表');
                this.warnings.forEach(warning => logWarning(warning));
            }
        }
        
        console.log('\n' + colorize('验证总结:', 'bright'));
        console.log(`错误: ${colorize(this.errors.length.toString(), this.errors.length > 0 ? 'red' : 'green')}`);
        console.log(`警告: ${colorize(this.warnings.length.toString(), this.warnings.length > 0 ? 'yellow' : 'green')}`);
        
        if (this.errors.length === 0) {
            logSuccess('配置文件基本结构正确，可以使用！');
        } else {
            logError('配置文件存在错误，需要先修复才能使用。');
        }
    }

    // 生成示例配置
    generateSampleConfig() {
        const sampleConfig = {
            "gitInstallationOptions": {
                "version": "2.48.1",
                "lastUpdated": new Date().toISOString().split('T')[0],
                "steps": [
                    {
                        "id": "sample_configuration",
                        "stepNumber": 1,
                        "title": "示例配置选项",
                        "description": "这是一个示例配置选项的说明",
                        "type": "radio",
                        "required": true,
                        "defaultValue": "option1",
                        "recommendation": "建议选择推荐的选项",
                        "options": [
                            {
                                "label": "选项一",
                                "value": "option1",
                                "description": "这是第一个选项的描述",
                                "recommended": true
                            },
                            {
                                "label": "选项二",
                                "value": "option2",
                                "description": "这是第二个选项的描述",
                                "recommended": false
                            }
                        ],
                        "output": "选择: {value}",
                        "tips": "这是一些有用的提示信息"
                    }
                ],
                "userProfiles": {
                    "beginner": {
                        "name": "初学者",
                        "description": "首次使用Git的用户",
                        "recommendations": {
                            "sample_configuration": "option1"
                        }
                    }
                }
            }
        };
        
        return JSON.stringify(sampleConfig, null, 2);
    }
}

// 主函数
function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const configPath = args[1] || 'git-config-options.json';
    
    const validator = new ConfigValidator();
    
    switch (command) {
        case 'validate':
            logHeader('Git配置验证工具');
            console.log(colorize('配置文件路径:', 'dim'), configPath);
            
            if (validator.loadConfig(configPath)) {
                validator.validateStructure();
            }
            break;
            
        case 'sample':
            logHeader('生成示例配置');
            const sampleConfig = validator.generateSampleConfig();
            console.log(sampleConfig);
            
            if (args[2]) {
                fs.writeFileSync(args[2], sampleConfig, 'utf8');
                logSuccess(`示例配置已保存到: ${args[2]}`);
            }
            break;
            
        case 'help':
        default:
            console.log(colorize('Git安装配置指南 - 配置验证工具\n', 'bright'));
            console.log('使用方法:');
            console.log('  node validate-config.js validate [配置文件路径]');
            console.log('  node validate-config.js sample [输出文件路径]');
            console.log('  node validate-config.js help\n');
            console.log('命令说明:');
            console.log('  validate - 验证配置文件');
            console.log('  sample   - 生成示例配置');
            console.log('  help     - 显示帮助信息');
            break;
    }
}

// 运行主函数
if (require.main === module) {
    main();
}

module.exports = ConfigValidator;