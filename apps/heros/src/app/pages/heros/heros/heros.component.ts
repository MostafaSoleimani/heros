import { MarvelHerosService } from './../../../core/service/marvel-heros.service';
import { Component, OnInit } from '@angular/core';
import { IApiResult, IHero } from '../../../core/model/heros.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'marvel-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.scss'],
})
export class HerosComponent implements OnInit {
  
  heros: IHero[] = [];
  countAll = 0;
  pageNumber = 0;
  pageSize = 25;
  orderBy = '-modified';
  
  constructor(private marvelHerosService: MarvelHerosService) {}
  
  ngOnInit(): void {
    this.getHeros({limit: this.pageSize, offset: (this.pageNumber) * this.pageSize, orderBy: this.orderBy})
  }

  getHeros(params = {}) {
    this.marvelHerosService.getAll(params).subscribe((res: IApiResult<IHero>) => {
      this.heros = res.data.results;
      this.countAll = res.data.total;
    }) 
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.getHeros({limit: this.pageSize, offset: (this.pageNumber) * this.pageSize, orderBy: this.orderBy})
  }
}
