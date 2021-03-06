/**
 * 重构：内联变量
 * 反向重构： 提炼变量
 */

/**
 * "内联变量"步骤：
 * 1. 检查确认变量赋值语句的右侧表达式没有副作用。
 * 2. 如果变量没有被声明为不可修改,先将其变为不可修改,并执行测试。
 * 3. 找到第一处使用该变量的地方,将其替换为直接使用赋值语句的右侧表达式。
 * 4. 测试。
 * 5. 重复前面两步,逐一替换其他所有使用该变量的地方。
 * 6. 删除该变量的声明点和赋值语句。
 * 7. 测试。
 */
