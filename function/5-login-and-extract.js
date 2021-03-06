
// Read the `url` from request, goto the login page, enter username, password and click on login btn
// Capture screenshot and extract some fields form dashboard page.

module.exports = async ({ page, request }) => {
    
    // Go to login page and enter username, password and click on login btn
    await page.goto(request.url);            
    await page.type('#username', request.username);
    await page.type('#password', request.password);
    await page.click('#loginbtn');
    await page.waitForNavigation();
    
    // Capture screenshot after login
    await page.screenshot({path : 'sandbox.png'})
    
    // Extract some courses after login page
    const result = await page.evaluate(() => {
        const data = [];
        var courses = document.querySelectorAll('.coursebox');
        for (var course of courses) {
            
            var obj = {};
            var name = course.querySelector('.coursename');
            if(name){
                obj.name = name.textContent;
            }
            
            var teacher = course.querySelector('.teachers');
            if(teacher){
                obj.teacher = teacher.textContent;
            }
            
            var summary = course.querySelector('.summary');
            if(summary){
                obj.summary = summary.textContent;
            }
            
            data.push(obj);
        }
        return data;
    });
    
    return {
        data : result,
        type : 'application/json'
    };   
};