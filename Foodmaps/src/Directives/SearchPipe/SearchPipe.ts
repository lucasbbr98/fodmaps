import { Pipe, PipeTransform } from '@angular/core';
import { Patient, Questionnaire } from './../../Services/Models/DatabaseModels';
@Pipe({
  name: 'searchPatients'
})
export class SearchPatientPipe implements PipeTransform {
    transform(items: Patient[], searchText: string): Patient[] {
        if (!items) return [];
        if (searchText == null || searchText == "") return items;
        searchText = searchText.toLowerCase();

        return items.filter(it => {
            return it.name.toLowerCase().includes(searchText);
        });

    }
}

@Pipe({
    name: 'searchResearches'
})
export class SearchQuestionnairePipe implements PipeTransform {
    transform(items: Questionnaire[], searchText: string): Questionnaire[] {
        if (!items) return [];
        if (searchText == null || searchText == "") return items;
        searchText = searchText.toLowerCase();

        return items.filter(it => {
            return it.name.toLowerCase().includes(searchText);
        });

    }
}