class QueryBuilder {
  constructor(postId, keyword) {
    // whereParams 객체 생성
    this.whereParams = {
      ...(postId && { postId }), // postId가 존재하면 whereParams 객체에 추가
      ...(keyword && { keyword }), // keyword가 존재하면 whereParams 객체에 추가
    };

    // whereMapper 객체 생성
    this.whereMapper = {
      postId: this.postFilterBuilder, // postId에 대한 필터링 함수 등록
      keyword: this.keywordFilterBuilder, // keyword에 대한 필터링 함수 등록
    };
  }

  createWhereClause() {
    // whereParams 객체를 배열로 변환 후, 각 요소에 대해 필터링 함수를 적용하여 whereConditions 배열 생성
    const whereConditions = Object.entries(this.whereParams).map(
      ([key, value]) => {
        return this.whereMapper[key](value); // whereMapper 객체에서 key에 해당하는 필터링 함수를 적용하여 반환된 문자열을 whereConditions 배열에 추가
      }
    );

    // whereConditions 배열의 길이가 0이 아니면 WHERE 절 생성, 그렇지 않으면 빈 문자열 반환
    return whereConditions.length !== 0
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';
  }

  postFilterBuilder(postId) {
    // postId에 대한 필터링 함수. post.id가 postId와 일치하는지 확인하여 반환
    return `post.id = ${postId}`;
  }
  h;

  keywordFilterBuilder(keyword) {
    // keyword에 대한 필터링 함수. post.title 또는 post.location에 keyword가 포함되어 있는지 확인하여 반환
    return `post.title like "%${keyword}%" OR post.location like "%${keyword}%"`;
  }

  buildQuery() {
    // createWhereClause 메소드를 호출하여 WHERE 절 생성 후 반환
    return `${this.createWhereClause()}`;
  }
}

module.exports = QueryBuilder;
