function solve() {
    // TODO ...

    const ulAdoption = document.querySelector('#adoption ul');
    const ulAdopted = document.querySelector('#adopted ul');

    const inputs = Array.from(document.querySelectorAll('#add input'));
    const btnAdd = document.querySelector('#add button');

    btnAdd.addEventListener('click', onClickAdd);

    function onClickAdd(e) {
        e.preventDefault();

        if (!inputs.some(x => x.value === '') && !isNaN(inputs[1].value)) {
            let petName = inputs[0].value;
            let petAge = Number(inputs[1].value);
            let petKind = inputs[2].value;
            let petCurrentOwner = inputs[3].value;

            let btnContactOwner = element('button', 'Contact with owner');
            let inputNewOwner = element('input', [], { placeholder: 'Enter your names' });
            let btnTakeIt = element('button', 'Yes! I take it!');
            let btnChecked = element('button', 'Checked');

            ulAdoption.appendChild(
                element('li', [
                    element('p', [
                        element('strong', petName),
                        ' is a ',
                        element('strong', petAge.toString()),
                        ' year old ',
                        element('strong', petKind)
                    ]),
                    element('span', `Owner: ${petCurrentOwner}`),
                    btnContactOwner
                ]
                ));

            btnContactOwner.addEventListener('click', (e) => {
                let li = e.target.parentElement;
                
                btnContactOwner.remove();

                li.appendChild(
                    element('div', [
                        inputNewOwner,
                        btnTakeIt
                    ]));               
            });

            btnTakeIt.addEventListener('click', (e) => {
                if (inputNewOwner.value !== '') {

                    let liAdopted = e.target.parentElement.parentElement;

                    liAdopted.querySelector('div').remove();
                    liAdopted.querySelector('span').textContent = `New Owner: ${inputNewOwner.value}`;
                    liAdopted.appendChild(btnChecked);

                    ulAdopted.appendChild(liAdopted);
                }
            });

            btnChecked.addEventListener('click', (e) => {
                e.target.parentElement.remove();
            })
        }
    }


    function element(type, content, attributes) {
        const result = document.createElement(type);

        if (attributes !== undefined) {
            Object.assign(result, attributes);
        }

        if (Array.isArray(content)) {

            content.forEach(append);
        } else {
            append(content);
        }

        function append(node) {
            if (typeof node === 'string') {
                node = document.createTextNode(node);
            }

            result.appendChild(node);
        }

        return result;
    }

}

