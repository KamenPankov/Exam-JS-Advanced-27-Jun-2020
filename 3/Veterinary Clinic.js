class VeterinaryClinic {
    constructor(clinicName, capacity) {
        this.clinicName = clinicName;
        this.capacity = capacity;
        this.clients = [];

        this.totalProfit = 0;
        this.currentWorkload = 0;
    }

    newCustomer(ownerName, petName, kind, procedures) {

        if (this.capacity <= this.currentWorkload) {
            throw new Error('Sorry, we are not able to accept more patients!');
        }

        let getClient = this.clients.find(x => x.ownerName === ownerName);

        if (getClient !== undefined) {

            let getPet = getClient.pets.find(x => x.petName === petName);

            if (getPet === undefined) {
                getClient.pets.push({
                    petName: petName,
                    kind: kind,
                    procedures: procedures
                });

                this.currentWorkload++;

                return `Welcome ${petName}!`;

            } else if (getPet !== undefined && getPet.procedures.length > 0) {

                throw new Error(`This pet is already registered under ${getClient.ownerName} name! ${getPet.petName} is on our lists, waiting for ${getPet.procedures.join(', ')}.`);
            } else {

                
                getPet.procedures = procedures;
                
                this.currentWorkload++;
                
                return `Welcome ${petName}!`;
            }

        } else {

            let pets = [];
            pets.push({
                petName: petName,
                kind: kind,
                procedures: procedures
            });

            let newClient = {
                ownerName: ownerName,
                pets: pets
            };

            this.clients.push(newClient);

            this.currentWorkload++;

            return `Welcome ${petName}!`;
        }
    }

    onLeaving(ownerName, petName) {
        let getClient = this.clients.find(x => x.ownerName === ownerName);

        if (getClient === undefined) {
            throw new Error('Sorry, there is no such client!');
        }

        let getPet = getClient.pets.find(x => x.petName === petName);

        if (getPet === undefined || getPet.procedures.length === 0) {
            throw new Error(`Sorry, there are no procedures for ${petName}!`)
        }

        this.totalProfit += getPet.procedures.length * 500;
        getPet.procedures = [];

        this.currentWorkload--;

        return `Goodbye ${getPet.petName}. Stay safe!`;
    }

    toString() {
        let result = [];
        result.push(`${this.clinicName} is ${Math.floor((this.currentWorkload / this.capacity) * 100)}% busy today!`);

        result.push(`Total profit: ${this.totalProfit.toFixed(2)}$`);

        this.clients.sort((a, b) => a.ownerName.localeCompare(b.ownerName))
            .forEach(client => {
                result.push(`${client.ownerName} with:`);
                client.pets.sort((a, b) => a.petName.localeCompare(b.petName)).forEach(pet => {
                    result.push(`---${pet.petName} - a ${pet.kind.toLowerCase()} that needs: ${pet.procedures.join(', ')}`);
                });
            });

        return result.join('\n');
    }
}

let clinic = new VeterinaryClinic('SoftCare', 10);
console.log(clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['A154B', '2C32B', '12CDB']));
console.log(clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['A154B', '2C32B', '12CDB']));
console.log(clinic.newCustomer('Anna Morgan', 'Max', 'Dog', ['SK456', 'DFG45', 'KS456']));
console.log(clinic.newCustomer('Jim Jones', 'Tiny', 'Cat', ['A154B']));
console.log(clinic.onLeaving('Jim Jones', 'Tiny'));
console.log(clinic.toString());
clinic.newCustomer('Jim Jones', 'Sara', 'Dog', ['A154B']);
console.log(clinic.toString());