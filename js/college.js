const form = document.querySelector(`form`);
const inputRank = document.querySelector(`input[type='number']`);
const cards = document.querySelector('.cards');
const collegeOption = document.querySelector('#form select');


//Getting the names of the colleges asynchronously    
axios.get('colleges.json').then((res) => {

    let colArray = res.data.colleges;
    
    for(i = 0; i < colArray.length; i++) {
        
        let collegeNameArray = [];
        collegeNameArray.push(colArray[i][0]);

        let colleges = collegeNameArray.map((item) => {
            return `<option>${item}</option>`;
        });

        collegeOption.innerHTML += colleges;

    }

});


form.addEventListener('submit', (e) => {

    e.preventDefault();

    if(parseInt(inputRank.value) > 0 ) {

        axios.get('colleges.json').then((res) => {
                
        let colArray = res.data.colleges;
        inputRank.value = parseInt(inputRank.value);
        let results = 0;

        let totalClg = 0;

        cards.innerHTML = '';
        
        for(i = 0; i < colArray.length; i++) {

            let t = 0;
            let branchArray = [];
            var z = 0;

            for(j = 1; j < colArray[i].length; j++) {

                for(k = 0; k < colArray[i][j].length; k++) {

                    if(parseInt(colArray[i][j][k].gen_cr) >= inputRank.value) {

                        if(t == 0) {
                            var clgName = colArray[i][0];
                            t++;
                        }
 
                        branchArray.push(colArray[i][j][k].branch);
                        results++;

                    }

                }

            }


            if(t == 1 && collegeOption.value == 'select college') {

                totalClg++;

                let branches = branchArray.map((item) => {
                    return `<li class='branch'>${item}</li>`;
                }).join('');

                cards.innerHTML += `
                    <div class="card">
                        <span class="clg-name"> ${clgName} </span>
                        <div class="clg-branches">
                            <ol class='branchList'>
                               ${branches}
                            </ol>
                        </div>
                        <img alt="${colArray[i][0]}" src="https://${colArray[i][2]}" height="300" width="200">
                        <a href='${colArray[i][3]}' target='_blank'> 
                            <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" height="300" width="200">
                        </a>
                    </div>`;

            }
            else if(t == 1 && collegeOption.value == clgName){

                let branches = branchArray.map((item) => {
                    return `<li class='branch'>${item}</li>`;
                }).join('');

                cards.innerHTML += `
                    <div class="card">
                        <span class="clg-name"> ${clgName} </span>
                        <div class="clg-branches">
                            <ol class='branchList'>
                               ${branches}
                            </ol>
                        </div>
                        <img alt="${colArray[i][0]}" src="https://${colArray[i][2]}" height="300" width="200">
                        <a href='${colArray[i][3]}' target='_blank'> 
                            <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" height="300" width="200">
                        </a>
                    </div>`;
                    z = 1;
                    break;

            }
            if(z == 1) { break; }

        }
        if(z == 0 && collegeOption.value !== 'select college') {
            alert('This college does not have any branch available according to your rank');
        }
        else if(results == 0 && collegeOption.value == 'select college') { 
            alert(`No colleges available with your rank`);  
        }else if(collegeOption.value == 'select college'){ 
            alert(`We found ${totalClg} result(s) pertaining to your rank`);
        }
            
        }).catch((err) => {
            console.log(err);
        })

    }else { alert('Please enter a valid rank'); }

});


        