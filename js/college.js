const form = document.querySelector(`form`);
const input = document.querySelector(`input[type='number']`);
const cards = document.querySelector('.cards');

form.addEventListener('submit', (e) => {

    e.preventDefault();

    if(parseInt(input.value) > 0 ) {

        axios.get('colleges.json').then((res) => {
                
        let colArray = res.data.colleges;
        input.value = parseInt(input.value);
        let results = 0;

        let totalClg = 0;

        cards.innerHTML = '';
        
        for(i = 0; i < colArray.length; i++) {

            let t = 0;
            let branchArray = [];

            for(j = 1; j < colArray[i].length; j++) {

                for(k = 0; k < colArray[i][j].length; k++) {

                    if(parseInt(colArray[i][j][k].gen_cr) >= input.value) {

                        if(t == 0) {
                            var clgName = colArray[i][0];
                            t++;
                        }
 
                        branchArray.push(colArray[i][j][k].branch);
                        results++;

                    }

                }

            }

            if(t == 1) {

                totalClg++;

                let branches = branchArray.map((item) => {
                    return `<li>${item}</li>`;
                }).join('');

                cards.innerHTML += `
                    <div class="card">
                        <span class="clg-name"> ${clgName} </span>
                        <div class="clg-branches">
                            <ul>
                               ${branches}
                            </ul>
                        </div>
                        <img src="https://${colArray[i][2]}" height="300" width="200">
                        <a href='${colArray[i][3]}' target='_blank'> 
                            <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" height="300" width="200">
                        </a>
                    </div>`;

            }

        }
        if(results == 0) { 
            alert(`No colleges available with your rank`);  
        } else { 
            alert(`We found ${totalClg} result(s) pertaining to your rank`);
        }
            
            }).catch((err) => {
                console.log(err);
            })

        }else { alert('Please enter a valid rank'); }

        });


        